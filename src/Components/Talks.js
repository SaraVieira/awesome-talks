import { Component } from 'preact'
import { Col, Row } from 'react-styled-flexboxgrid'
import shuffle from 'shuffle-array'
import Video from './Video'
import { graphql, compose } from 'react-apollo'
import Query from './Query'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import SHOW_VIEWED from '../Queries/SHOW_VIEWED'
import GET_WATCHED from '../Queries/GET_WATCHED'

const shuffleArr = arr => shuffle(arr, { copy: true })

class TalksComponent extends Component {
  state = {
    step: 20,
    visibleStart: 0,
    visibleEnd: 20,
    videos: shuffleArr(this.props.talks).slice(0, this.state.step)
  }

  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  componentWillUnmount = () =>
    window.removeEventListener('scroll', this.handleScroll)

  componentDidUpdate = (prevProps, prevState) => {
    const allTalks =
      this.props.hideViewed && !prevProps.hideViewed
        ? this.props.talks.filter(t => !this.props.watched.includes(t.id))
        : this.props.talks

    if (this.props.hideViewed !== prevProps.hideViewed) {
      this.setState({
        ...this.state,
        videos: shuffleArr(allTalks).slice(0, this.state.step)
      })
    }
  }

  handleScroll = event => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight
    const body = document.body
    const html = document.documentElement
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight) {
      const visibleStart = this.state.visibleStart + this.state.step
      const visibleEnd = this.state.visibleEnd + this.state.step
      const nextVideos = [
        ...shuffleArr(this.props.talks.slice(visibleStart, visibleEnd))
      ]
      this.setState({
        visibleStart: visibleStart,
        visibleEnd: visibleEnd,
        videos: [...this.state.videos, ...nextVideos]
      })
    }
  }

  render = ({ talks }, { videos }) => (
    <Col xs={12}>
      <Row>{videos.map(v => <Video key={v.id} {...v} />)}</Row>
    </Col>
  )
}

const Talks = compose(
  graphql(SHOW_VIEWED, {
    props: ({ data }) => ({ hideViewed: data.hideViewed })
  }),
  graphql(GET_WATCHED, {
    props: ({ data }) => ({ watched: data.watched })
  })
)(TalksComponent)

const VideoComponent = () => (
  <Query query={ALL_VIDEOS}>
    {({ data: { allVideoses } }) => (
      <Row>
        <Talks talks={allVideoses} />
      </Row>
    )}
  </Query>
)

export default VideoComponent

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
    videos: this.props.talks.slice(0, 20)
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { watched, talks, hideViewed } = this.props
    const allTalks =
      hideViewed && !prevProps.hideViewed
        ? talks.filter(t => !watched.includes(t.id))
        : talks

    if (hideViewed !== prevProps.hideViewed) {
      this.setState({
        ...this.state,
        videos: allTalks.slice(0, 20)
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
        <Talks talks={shuffleArr(allVideoses)} />
      </Row>
    )}
  </Query>
)

export default VideoComponent

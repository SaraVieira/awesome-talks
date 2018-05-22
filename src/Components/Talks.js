import { Component } from 'preact'
import { Col, Row } from 'react-styled-flexboxgrid'
import shuffle from 'shuffle-array'
import Video from './Video'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import Query from './Query'
import { docHeight, windowBottom } from '../Utils/dom'

class Talks extends Component {
  state = {
    step: 20,
    visibleStart: 0,
    visibleEnd: 20,
    videos: shuffle(this.props.talks, { copy: true }).slice(0, this.state.step)
  }

  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  componentWillUnmount = () =>
    window.removeEventListener('scroll', this.handleScroll)

  handleScroll = event => {
    if (windowBottom >= docHeight) {
      const visibleStart = this.state.visibleStart + this.state.step
      const visibleEnd = this.state.visibleEnd + this.state.step
      const nextVideos = [...this.props.talks.slice(visibleStart, visibleEnd)]
      this.setState({
        visibleStart: visibleStart,
        visibleEnd: visibleEnd,
        videos: [...this.state.videos, ...nextVideos]
      })
    }
  }

  render = ({ talks }, { videos }) => (
    <strong>{videos.map(v => <Video key={v.id} {...v} />)}</strong>
  )
}

const VideoComponent = () => (
  <Query query={ALL_VIDEOS}>
    {({ data: { allVideoses } }) => (
      <Row>
        <Col xs={12}>
          <Talks talks={allVideoses} />
        </Col>
      </Row>
    )}
  </Query>
)

export default VideoComponent

import { Component } from 'preact'
import { Col, Row } from 'react-styled-flexboxgrid'
import shuffle from 'shuffle-array'
import Video from './Video'

const shuffleArr = arr => shuffle(arr, { copy: true })

class Talks extends Component {
  state = {
    step: 20,
    visibleStart: 0,
    visibleEnd: 20,
    videos: shuffleArr(this.props.talks).slice(0, this.state.step)
  }

  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  componentWillUnmount = () =>
    window.removeEventListener('scroll', this.handleScroll)

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

const VideoComponent = ({ talks }) => {
  return (
    <Row>
      <Talks talks={talks} />
    </Row>
  )
}

export default VideoComponent

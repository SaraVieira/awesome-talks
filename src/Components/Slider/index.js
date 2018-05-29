import Carousel from 'nuka-carousel'
import styled from 'styled-components'

const SlideWrapper = styled(Carousel)`
  margin-top: 40px;
`

const doNotRender = () => {
  return null
}

const rightControl = props => {
  const currentSlide = props.currentSlide + props.slidesToShow
  if (currentSlide >= props.slideCount) {
    return null
  }
  return <button onClick={props.nextSlide}>Next</button>
}

const leftControl = props => {
  if (props.currentSlide === 0) {
    return null
  }
  return <button onClick={props.previousSlide}>Prev</button>
}

export default props => {
  const carouselSettings = {
    slidesToShow: 4,
    slidesToScroll: 3,
    renderBottomCenterControls: doNotRender,
    renderCenterLeftControls: doNotRender,
    renderCenterRightControls: doNotRender,
    renderBottomLeftControls: leftControl,
    renderBottomRightControls: rightControl
  }
  return <SlideWrapper {...carouselSettings}>{props.children}</SlideWrapper>
}

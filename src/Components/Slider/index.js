import Carousel from 'nuka-carousel'

const doNotRender = () => {
  return null
}

const rightControl = props => {
  const currentSlide = props.currentSlide + props.slidesToShow
  if (currentSlide === props.slideCount) {
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
    slidesToShow: 3,
    slidesToScroll: 2,
    renderBottomCenterControls: doNotRender,
    renderCenterLeftControls: doNotRender,
    renderCenterRightControls: doNotRender,
    renderBottomLeftControls: leftControl,
    renderBottomRightControls: rightControl
  }
  return <Carousel {...carouselSettings}>{props.children}</Carousel>
}

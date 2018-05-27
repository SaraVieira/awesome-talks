import Carousel from 'nuka-carousel'

export default props => {
  const carouselSettings = {
    slidesToShow: 3,
    slidesToScroll: 2
  }
  return <Carousel {...carouselSettings}>{props.children}</Carousel>
}

import Carousel from 'nuka-carousel'

export default props => {
  return <Carousel {...props.settings}>{props.children}</Carousel>
}

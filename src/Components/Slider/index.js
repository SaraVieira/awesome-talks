import Carousel from 'nuka-carousel'
import Video from '../Video'
import styled from 'styled-components'

const SliderWrapper = styled.div`
  width: 100%;
  height: 250px;
`

export default ({ videos }) => {
  const settings = { slidesToShow: 5 }
  return (
    <SliderWrapper>
      <Carousel {...settings}>
        {videos.map(v => <Video key={v.id} {...v} speaker={v.speaker} />)}
      </Carousel>
    </SliderWrapper>
  )
}

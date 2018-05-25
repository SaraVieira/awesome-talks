import Header from './../Components/Header'
import Query from './../Components/Query'
import Item from './../Components/Styling/Item'
import TAGS from '../Queries/TAGS'
import Carousel from 'nuka-carousel'
import Video from './../Components/Video'

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

export default () => (
  <div>
    <Header title="Categories" noSearch />
    <div>
      <Col xs={12}>
        <Query query={TAGS}>
          {({ data: { allTagses } }) => {
            return (
              <div>
                {allTagses.map(s => (
                  <Item key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Item>
                  <Carousel {...settings}>
                  {s.videos.map(v => (
                    <Video key={v.id} {...v} speaker={v.speaker} />
                  ))}
                </Carousel>
                ))}
              </div>
            )
          }}
        </Query>
      </Col>
    </div>
  </Grid>
)

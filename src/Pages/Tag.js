import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import TAG_VIDEOS from '../Queries/TAG_VIDEOS'

const humanize = str => {
  var frags = str.split('-')
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
  }
  return frags.join(' ').toLowerCase()
}

export default ({ category }) => (
  <Grid>
    <Header title={`#${humanize(category)}`} noSearch />
    <Row>
      <Col xs={12}>
        <Query query={TAG_VIDEOS} variables={{ name: humanize(category) }}>
          {({ data: { allTagses } }) => {
            return (
              <Row>
                {allTagses[0].videos.map(v => (
                  <Video key={v.id} {...v} speaker={v.speaker} />
                ))}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

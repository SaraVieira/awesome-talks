import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import TAG_VIDEOS from '../Queries/TAG_VIDEOS'
import humanize from '../Utils/strings'

export default ({ category }) => (
  <Grid>
    <Header title={`#${humanize(category)}`} noSearch />
    <Row>
      <Col xs={12}>
        <Query query={TAG_VIDEOS} variables={{ name: humanize(category) }}>
          {({ data: { allTagses } }) => {
            return (
              <Row>
                {allTagses[0].videos.map(v => <Video key={v.id} talk={v} />)}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

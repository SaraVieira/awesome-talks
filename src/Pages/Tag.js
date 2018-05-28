import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import TAG_VIDEOS from '../Queries/TAG_VIDEOS'
import humanize from '../Utils/strings'
import Nav from './../Components/Nav'
import { Helmet } from 'react-helmet'

export default ({
  match: {
    params: { category }
  }
}) => (
  <Grid>
    <Nav />
    <Helmet>
      <title>Awesome Talks - {category}</title>
      <meta
        name="description"
        content="Amazing Tech Talks curated by the community ❤️"
      />
      <meta
        name="twitter:title"
        content={`Awesome Talks - ${humanize(category)}`}
      />
      <meta
        name="twitter:description"
        content="Amazing Tech Talks curated by the community ❤️"
      />
      <meta
        name="twitter:image"
        content="https://file-iloqdynwox.now.sh/"
      />
      <meta name="twitter:image:alt" content="awesome talks" />
    </Helmet>
    <Header title={`#${humanize(category)}`} noSearch />
    <Row>
      <Col xs={12}>
        <Query
          query={TAG_VIDEOS}
          variables={{ name: humanize(category) }}
        >
          {({ data: { allTagses } }) => (
            <Row>
              {allTagses[0].videos.map(v => (
                <Video key={v.id} talk={v} />
              ))}
            </Row>
          )}
        </Query>
      </Col>
    </Row>
  </Grid>
)

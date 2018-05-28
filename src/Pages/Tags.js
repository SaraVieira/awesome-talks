import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Item from './../Components/Styling/Item'
import TAGS from '../Queries/TAGS'

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

export default () => (
  <Grid>
    <Header title="Categories" noSearch />
    <Row>
      <Col xs={12}>
        <Query query={TAGS}>
          {({ data: { allTagses } }) => {
            return (
              <Row>
                {allTagses.map(s => (
                  <Item key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Item>
                ))}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

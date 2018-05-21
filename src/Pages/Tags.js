import { Link } from 'preact-router/match'
import styled from 'styled-components'

import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import TAGS from '../Queries/TAGS'

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

const Speaker = styled(Link)`
  background-color: #fbfbfb;
  border: 1px solid #a9b1b5;
  padding: 6px 15px;
  color: #a9b1b5;
  border-radius: 5px;
  transition: all 300ms ease-in-out;
  margin: 5px;
  text-decoration: none;

  &:after {
    width: 0;
    height: 0;
  }

  &:hover {
    border: 1px solid #63d3e1;
    color: #63d3e1;
  }
`

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
                  <Speaker key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Speaker>
                ))}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

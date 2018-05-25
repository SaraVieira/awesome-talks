import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Tag from './../Components/Tag'
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
                  <Tag key={s.id} href={makeLink(s.name)}>
                    {s.name}
                  </Tag>
                ))}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

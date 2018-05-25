import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Item from './../Components/Styling/Item'
import SPEAKERS from '../Queries/SPEAKERS'

const makeLink = name => `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

export default ({ speaker }) => (
  <Grid>
    <Header title="Speakers" noSearch />
    <Row>
      <Col xs={12}>
        <Query query={SPEAKERS}>
          {({ data: { allSpeakerses } }) => {
            return (
              <Row>
                {allSpeakerses.map(s => (
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

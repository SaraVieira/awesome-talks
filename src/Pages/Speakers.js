import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Header from './../Components/Header'
import Query from './../Components/Query'
import SPEAKERS from '../Queries/SPEAKERS'
import { Figure, Img, Caption, Name } from './../Components/Styling/Speaker'

const makeLink = name => `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

const makeName = name => name.split(' ')

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
                  <Figure key={s.id}>
                    <Img src={(s.photo || {}).url} alt={s.name} />
                    <Caption>
                      <Name>
                        {makeName(s.name)[0]}{' '}
                        <span>
                          {makeName(s.name)
                            .slice(-1)
                            .join(' ')}
                        </span>
                      </Name>
                    </Caption>
                    <a className="no-hover" href={makeLink(s.name)} />
                  </Figure>
                ))}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

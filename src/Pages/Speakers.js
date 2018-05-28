import React from 'react'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import Header from './../Components/Header'
import Query from './../Components/Query'
import SPEAKERS from '../Queries/SPEAKERS'
import { Figure, Img, Caption, Name } from './../Components/Styling/Speaker'

const makeLink = name => `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

const makeName = name => name.split(' ')

const Wrapper = styled(Flex)`
  @media (max-width: 685px) {
    justify-content: center;
  }
`

export default ({ speaker }) => (
  <Grid>
    <Header title="Speakers" noSearch />
    <Row>
      <Col xs={12}>
        <Query query={SPEAKERS}>
          {({ data: { allSpeakerses } }) => {
            return (
              <Row>
                <Wrapper wrap justifyBetween>
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
                      {/* eslint-disable-jsx-a11y/anchor-has-content */}
                      <a
                        aria-label="go to spaker"
                        className="no-hover"
                        href={makeLink(s.name)}
                      >
                        a
                      </a>
                    </Figure>
                  ))}
                </Wrapper>
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

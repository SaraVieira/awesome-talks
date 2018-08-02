import React from 'react'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Header from './../Components/Header'
import Query from './../Components/Query'
import GET_PROPOSED_TALKS from '../Queries/GET_PROPOSED_TALKS'
import Nav from './../Components/Nav'
import CookieBanner from './../Components/CookieBanner'
import Video from './../Components/Video'

const Proposed = () => (
    <Grid>
        <div role="banner">
            <Nav />
            <Header title="Proposed Talks" noSearch />
        </div>
        <Row>
            <Col xs={12}>
                <main>
                    <Query query={GET_PROPOSED_TALKS}>
                        {({ data: { allVideoses } }) => (
                            <Row>
                                {allVideoses.map(v => (
                                    <Video noLink key={v.id} talk={v} />
                                ))}
                            </Row>
                        )}
                    </Query>
                </main>
            </Col>
        </Row>
        <CookieBanner />
    </Grid>
)

export default Proposed

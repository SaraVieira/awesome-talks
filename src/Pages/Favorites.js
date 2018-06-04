import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import GET_FAVORITES from '../Queries/GET_FAVORITES'
import GET_VIDEOS from '../Queries/GET_VIDEOS'
import Nav from './../Components/Nav'

export default () => (
    <Grid>
        <div role="banner">
            <Nav />
            <Header title="Favorites" noSearch />
        </div>
        <main>
            <Row>
                <Col xs={12}>
                    <Query query={GET_FAVORITES}>
                        {({ data: { favorites } }) => (
                            <Query
                                query={GET_VIDEOS}
                                variables={{ ids: favorites }}
                            >
                                {({ data: { allVideoses } }) => (
                                    <Row>
                                        {allVideoses.map(v => (
                                            <Video key={v.id} talk={v} />
                                        ))}
                                    </Row>
                                )}
                            </Query>
                        )}
                    </Query>
                </Col>
            </Row>
        </main>
    </Grid>
)

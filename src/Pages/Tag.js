import React from 'react'
import { Helmet } from 'react-helmet'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'

import Header from './../Components/Header'
import Query from './../Components/Query'
import Video from './../Components/Video'
import TAG_VIDEOS from '../Queries/TAG_VIDEOS'
import humanize from '../Utils/strings'
import Nav from './../Components/Nav'
import CookieBanner from './../Components/CookieBanner'

export default ({
    match: {
        params: { category }
    }
}) => (
    <Grid>
        <Helmet>
            <title>{category}</title>
            <meta
                name="twitter:title"
                content={`Awesome Talks - ${humanize(category)}`}
            />
        </Helmet>
        <div role="banner">
            <Nav />
            <Header title={`#${humanize(category)}`} noSearch code />
        </div>
        <Row>
            <Col xs={12}>
                <main>
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
                </main>
            </Col>
        </Row>
        <CookieBanner />
    </Grid>
)

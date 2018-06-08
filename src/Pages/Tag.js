import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import TAG_VIDEOS from '../Queries/TAG_VIDEOS'
import humanize from '../Utils/strings'
import Nav from './../Components/Nav'
import { Helmet } from 'react-helmet'
import CookieBanner from './../Components/CookieBanner'
import Error404 from './../Components/Errors/Error404'

export default ({
    match: {
        params: { category }
    }
}) => (
    <Grid>
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
                        {({ data: { allTagses } }) => {
                            if (
                                !allTagses.length ||
                                !allTagses[0].videos.length
                            ) {
                                return <Error404 />
                            }

                            return (
                                <Row>
                                    {allTagses[0].videos.map(v => (
                                        <Video key={v.id} talk={v} />
                                    ))}
                                </Row>
                            )
                        }}
                    </Query>
                </main>
            </Col>
        </Row>
        <CookieBanner />
    </Grid>
)

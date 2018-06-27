import React, { Fragment } from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import TAG_VIDEOS from '../Queries/TAG_VIDEOS'
import humanize from '../Utils/strings'
import Nav from './../Components/Nav'
import TagMeta from '../Components/MetaTags/Tag'
import CookieBanner from './../Components/CookieBanner'
import Error404 from './../Components/Errors/Error404'

export default ({
    match: {
        params: { category }
    }
}) => (
    <Grid>
        <TagMeta category={category} />
        <div role="banner">
            <Nav />
        </div>
        <Query query={TAG_VIDEOS} variables={{ name: humanize(category) }}>
            {({ data: { allTagses } }) => (
                <Fragment>
                    {!allTagses.length || !allTagses[0].videos.length ? (
                        <Error404 />
                    ) : (
                        <Fragment>
                            <Header
                                title={`#${humanize(category)}`}
                                noSearch
                                code
                            />
                            <Row>
                                <Col xs={12}>
                                    <main>
                                        <Row>
                                            {allTagses[0].videos.map(v => (
                                                <Video key={v.id} talk={v} />
                                            ))}
                                        </Row>
                                    </main>
                                </Col>
                            </Row>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Query>
        <CookieBanner />
    </Grid>
)

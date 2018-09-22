import React, { Fragment } from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import { graphql } from 'react-apollo'
import Carousel from 'react-fluid-carousel'

import TAGS from '../Queries/TAGS'
import Nav from './../Components/Nav'
import TagsMeta from '../Components/MetaTags/Tags'
import Filter from '../Utils/search'
import GET__TAGS_SEARCH from '../Queries/Local/GET__TAGS_SEARCH'
import Tag from '../Components/Tag'
import CookieBanner from './../Components/CookieBanner'
import { SimpleVideo as Video } from './../Components/Video'
import Player from './../Components/Player'

const Tags = ({ data: { searchTags } }) => (
    <Grid>
        <TagsMeta />
        <div role="banner">
            <Nav />
            <Header
                title="Categories"
                code
                query={GET__TAGS_SEARCH}
                keyName="searchTags"
            />
        </div>
        <Row>
            <Col xs={12}>
                <main>
                    <Query query={TAGS}>
                        {({ data: { allTagses: allTags } }) => (
                            <Fragment>
                                {Filter(searchTags, allTags).map(t => {
                                    return (
                                        <Fragment key={t.id}>
                                            <div>
                                                <Tag
                                                    className="no-hover"
                                                    {...t}
                                                />
                                            </div>
                                            <Carousel speed={1000}>
                                                {t.videos.map(video => (
                                                    <div
                                                        key={video.id}
                                                        style={{
                                                            height: '150px',
                                                            width: '200px'
                                                        }}
                                                    >
                                                        <Video
                                                            {...video}
                                                            Player={Player}
                                                            noText
                                                        />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </Fragment>
                                    )
                                })}
                            </Fragment>
                        )}
                    </Query>
                </main>
            </Col>
        </Row>
        <CookieBanner />
    </Grid>
)

export default graphql(GET__TAGS_SEARCH)(Tags)

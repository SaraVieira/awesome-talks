import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import { graphql } from 'react-apollo'

import TAGS from '../Queries/TAGS'
import Nav from './../Components/Nav'
import { Helmet } from 'react-helmet'
import Filter from '../Utils/search'
import GET__TAGS_SEARCH from '../Queries/GET__TAGS_SEARCH'
import Tag from '../Components/Tag'

const Tags = ({ data: { searchTags } }) => (
    <Grid>
        <Helmet>
            <title>Awesome Talks - Categories</title>
            <meta
                name="description"
                content="Amazing Tech Talks curated by the community ❤️"
            />
            <meta name="twitter:title" content="Awesome Talks - Categories" />
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
                            <Row style={{ justifyContent: 'space-around' }}>
                                {Filter(searchTags, allTags).map(t => (
                                    <Tag
                                        className="no-hover"
                                        key={t.id}
                                        {...t}
                                    />
                                ))}
                            </Row>
                        )}
                    </Query>
                </main>
            </Col>
        </Row>
    </Grid>
)

export default graphql(GET__TAGS_SEARCH)(Tags)

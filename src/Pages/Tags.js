import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import { graphql } from 'react-apollo'

import TAGS from '../Queries/TAGS'
import Nav from './../Components/Nav'
import TagsMeta from '../Components/MetaTags/Tags'
import Filter from '../Utils/search'
import GET__TAGS_SEARCH from '../Queries/Local/GET__TAGS_SEARCH'
import Tag from '../Components/Tag'
import CookieBanner from './../Components/CookieBanner'

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
        <CookieBanner />
    </Grid>
)

export default graphql(GET__TAGS_SEARCH)(Tags)

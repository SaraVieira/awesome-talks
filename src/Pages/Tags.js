import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Item from './../Components/Styling/Item'
import TAGS from '../Queries/TAGS'
import Nav from './../Components/Nav'
import { Helmet } from 'react-helmet'

const makeLink = name => `/category/${name.replace(/\s+/g, '-').toLowerCase()}`

export default () => (
    <Grid>
        <Nav />
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
        <Header title="Categories" noSearch />
        <Row>
            <Col xs={12}>
                <Query query={TAGS}>
                    {({ data: { allTagses } }) => {
                        return (
                            <Row>
                                {allTagses.map(s => (
                                    <Item key={s.id} to={makeLink(s.name)}>
                                        {s.name}
                                    </Item>
                                ))}
                            </Row>
                        )
                    }}
                </Query>
            </Col>
        </Row>
    </Grid>
)

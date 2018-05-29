import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import GET_SEARCH from '../Queries/GET_SEARCH'
import Header from './../Components/Header'
import Talks from './../Components/Talks'
import Nav from './../Components/Nav'
import { Helmet } from 'react-helmet'

export default () => (
    <Grid>
        <Helmet>
            <title>Awesome Talks</title>
            <meta
                name="description"
                content="Amazing Tech Talks curated by the community ❤️"
            />
            <meta name="twitter:title" content="Awesome Talks" />
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
        <Nav />
        <Header />
        <Query query={GET_SEARCH}>
            {({ data: { search }, client }) => <Talks search={search} />}
        </Query>
    </Grid>
)

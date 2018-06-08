import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'

import Query from './../Components/Query'
import GET_SEARCH from '../Queries/GET_SEARCH'
import Header from './../Components/Header'
import Talks from './../Components/Talks'
import Nav from './../Components/Nav'
import CookieBanner from './../Components/CookieBanner'

export default () => (
    <Grid>
        <div role="banner">
            <Nav />
            <Header query={GET_SEARCH} keyName="search" />
        </div>
        <main>
            <Query query={GET_SEARCH}>
                {({ data: { search }, client }) => <Talks search={search} />}
            </Query>
        </main>
        <CookieBanner />
    </Grid>
)

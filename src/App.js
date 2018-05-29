import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import 'isomorphic-fetch'

import Home from './Pages/Home'
import Speakers from './Pages/Speakers'
import Speaker from './Pages/Speaker'
import Tags from './Pages/Tags'
import Tag from './Pages/Tag'
import Favorites from './Pages/Favorites'

import './Utils/global-styles'
import theme from './Utils/theme'
import stateLink from './Utils/stateLink'

const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
        stateLink,
        new HttpLink({
            uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq'
        })
    ]),
    cache: new InMemoryCache()
})

export default () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/categories" component={Tags} />
                    <Route path="/category/:category" component={Tag} />
                    <Route path="/speakers" component={Speakers} />
                    <Route path="/speaker/:speaker" component={Speaker} />
                </div>
            </Router>
        </ThemeProvider>
    </ApolloProvider>
)

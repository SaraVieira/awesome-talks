import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
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
import { WATCHED_KEY, FAV_KEY, getStorage } from './Utils/state'

const defaultState = {
    favorites: getStorage(FAV_KEY),
    watched: getStorage(WATCHED_KEY),
    hideViewed: false,
    search: ''
}

const cache = new InMemoryCache()
// .restore(window.__APOLLO_STATE__)

export const stateLink = withClientState({
    defaults: defaultState,
    cache,
    resolvers: {
        Mutation: {
            addFavorite: (_, { id }, { cache }) => {
                const query = gql`
                    query GetFavorites {
                        favorites @client
                    }
                `

                const previous = cache.readQuery({ query })
                const data = {
                    favorites: [...previous.favorites, id]
                }

                localStorage.setItem(FAV_KEY, JSON.stringify(data.favorites))

                cache.writeQuery({ query, data })
            },
            removeFavorite: (_, { id }, { cache }) => {
                const query = gql`
                    query GetFavorites {
                        favorites @client
                    }
                `

                const previous = cache.readQuery({ query })
                const data = {
                    favorites: previous.favorites.filter(a => a !== id)
                }

                localStorage.setItem(FAV_KEY, JSON.stringify(data.favorites))

                cache.writeQuery({ query, data })
            },
            addWatched: (_, { id }, { cache }) => {
                const query = gql`
                    query GetWatched {
                        watched @client
                    }
                `

                const previous = cache.readQuery({ query })
                const data = {
                    watched: [...previous.watched, id]
                }

                localStorage.setItem(WATCHED_KEY, JSON.stringify(data.watched))

                cache.writeQuery({ query, data })
            },
            removeWatched: (_, { id }, { cache }) => {
                const query = gql`
                    query GetWatched {
                        watched @client
                    }
                `

                const previous = cache.readQuery({ query })
                const data = {
                    watched: previous.watched.filter(a => a !== id)
                }

                localStorage.setItem(WATCHED_KEY, JSON.stringify(data.watched))

                cache.writeQuery({ query, data })
            }
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
        stateLink,
        new HttpLink({
            uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq'
        })
    ]),
    cache
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

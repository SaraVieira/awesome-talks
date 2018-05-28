import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloProvider } from 'react-apollo'
import routes from './routes'
import { ThemeProvider } from 'styled-components'

import './Utils/global-styles'
import './Utils/icons'
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

ensureReady(routes).then(data =>
  hydrate(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <After data={data} routes={routes} />
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
  )
)

if (module.hot) {
  module.hot.accept()
}

import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ensureReady, After } from '@jaredpalmer/after'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import routes from './routes'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { ThemeProvider } from 'styled-components'

import Nav from './Components/Nav'
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

const stateLink = {
  defaults: defaultState,
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
}

const client = new ApolloClient({
  uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq',
  clientState: stateLink
})

ensureReady(routes).then(data =>
  hydrate(
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Nav />
        <BrowserRouter>
          <ApolloProvider client={client}>
            <After data={data} routes={routes} />
          </ApolloProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>,
    document.getElementById('root')
  )
)

if (module.hot) {
  module.hot.accept()
}

OfflinePluginRuntime.install()

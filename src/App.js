import Home from './Pages/Home'
import AsyncRoute from 'preact-async-route'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Router from 'preact-router'
import { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'

import Nav from './Components/Nav'
import './Utils/global-styles'
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

export default () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <div
        style={{
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Helmet>
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
        <Router>
          <Home path="/" />
          <AsyncRoute
            path="/speaker/:speaker"
            getComponent={() =>
              import('./Pages/Speaker').then(module => module.default)
            }
          />
          <AsyncRoute
            path="/speakers"
            getComponent={() =>
              import('./Pages/Speakers').then(module => module.default)
            }
          />
          <AsyncRoute
            path="/category/:category"
            getComponent={() =>
              import('./Pages/Tag').then(module => module.default)
            }
          />
          <AsyncRoute
            path="/categories"
            getComponent={() =>
              import('./Pages/Tags').then(module => module.default)
            }
          />
          <AsyncRoute
            path="/favorites"
            getComponent={() =>
              import('./Pages/Favorites').then(module => module.default)
            }
          />
        </Router>
      </div>
    </ApolloProvider>
  </ThemeProvider>
)

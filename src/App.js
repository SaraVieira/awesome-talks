import Home from './Pages/Home'
import AsyncRoute from 'preact-async-route'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Router from 'preact-router'
import { ThemeProvider } from 'styled-components'

import './Utils/global-styles'
import Nav from './Components/Nav'
import {
  defaultState,
  GetFavorites,
  WATCHED_KEY,
  FAV_KEY,
  GetWatched
} from './Utils/state'

const clientState = {
  defaults: defaultState,
  resolvers: {
    Mutation: {
      addFavorite: (_, { id }, { cache }) => {
        const previous = cache.readQuery({ GetFavorites })
        const data = {
          favorites: [...previous.favorites, id]
        }

        console.log(cache, id)

        localStorage.setItem(FAV_KEY, JSON.stringify(data.favorites))

        cache.writeQuery({ GetFavorites, data })
      },
      removeFavorite: (_, { id }, { cache }) => {
        const previous = cache.readQuery({ GetFavorites })
        const data = {
          favorites: previous.favorites.filter(a => a !== id)
        }

        localStorage.setItem(FAV_KEY, JSON.stringify(data.favorites))

        cache.writeQuery({ GetFavorites, data })
      },
      addWatched: (_, { id }, { cache }) => {
        const previous = cache.readQuery({ GetWatched })
        const data = {
          watched: [...previous.watched, id]
        }

        localStorage.setItem(WATCHED_KEY, JSON.stringify(data.watched))

        cache.writeQuery({ GetWatched, data })
      },
      removeWatched: (_, { id }, { cache }) => {
        const previous = cache.readQuery({ GetWatched })
        const data = {
          watched: previous.watched.filter(a => a !== id)
        }

        localStorage.setItem(WATCHED_KEY, JSON.stringify(data.watched))

        cache.writeQuery({ GetWatched, data })
      }
    }
  }
}

const client = new ApolloClient({
  uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq',
  clientState
})

const theme = {
  black: '#000',
  white: '#fff',
  lightGrey: '#e6e9ec',
  darkGrey: '#666',
  green: '#51b257'
}

export default () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: '100%',
          overflow: 'hidden'
        }}
      >
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
    </ThemeProvider>
  </ApolloProvider>
)

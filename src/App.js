import { injectGlobal } from 'styled-components'
import Home from './Pages/Home'
import AsyncRoute from 'preact-async-route'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import Router from 'preact-router'
import remcalc from 'remcalc'

import Nav from './Components/Nav'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');
  body {
    margin: 0;
    padding: 0;
    font-family: Montserrat;
    font-size: ${remcalc(14)};
    color: #666;
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
    padding-bottom: ${remcalc(40)};
  }

  div[id*='do-not-delete-this-hack'] {
    display: none;
  }

  a {
    color: #337294;
    text-decoration: none;
    padding-bottom: ${remcalc(2)};
    border-bottom: ${remcalc(2)} solid #337294;
    position: relative;
    padding: ${remcalc(5)};;
    opacity: 0.8;
    font-wheight: 300;
    letter-spacing: ${remcalc(0.09)};
    text-align: left;
    line-height: ${remcalc(21)};;
    cursor: pointer;
    transition: color 200ms ease;

    &.no-hover {
        &:after {
            display: none;
        }
    }

    span {
      position: relative;
      z-index: 10;
    }

    &:after {
      transition: height 200ms ease;
      content: '';
      width: 100%;
      height: 0;
      background: #337294;
      display: block;
      position: absolute;
      bottom: 0;
      z-index: 0;
    }

    &:hover {
      color: white;

      &:after {
        height: 100%;
      }
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

const WATCHED_KEY = 'watched__awesome-talks'
const FAV_KEY = 'favorites__awesome-talks'

const getStorage = key => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || []
  }

  return []
}

const defaultState = {
  favorites: getStorage(FAV_KEY),
  watched: getStorage(WATCHED_KEY),
  hideViewed: false
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
  <ApolloProvider client={client}>
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
  </ApolloProvider>
)

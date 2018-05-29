import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { WATCHED_KEY, FAV_KEY, getStorage } from './state'

const defaultState = {
    favorites: getStorage(FAV_KEY),
    watched: getStorage(WATCHED_KEY),
    hideViewed: false,
    search: ''
}

export default withClientState({
    defaults: defaultState,
    cache: new InMemoryCache(),
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

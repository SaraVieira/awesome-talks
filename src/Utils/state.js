import gql from 'graphql-tag'

export const WATCHED_KEY = 'watched__awesome-talks'
export const FAV_KEY = 'favorites__awesome-talks'

export const getStorage = key => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(FAV_KEY)) || []
    }

    return []
}

export const setStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        return localStorage.setItem(key, JSON.stringify(data))
    }

    return null
}

export const GetFavorites = gql`
    query GetFavorites {
        favorites @client
    }
`
export const GetWatched = gql`
    query GetWatched {
        watched @client
    }
`

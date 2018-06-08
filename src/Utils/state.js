import gql from 'graphql-tag'
import Cookies from 'js-cookie'

export const WATCHED_KEY = 'watched__awesome-talks'
export const FAV_KEY = 'favorites__awesome-talks'
export const MODE_KEY = 'mode__awesome-talks'
export const BANNER_KEY = 'banner__awesome-talks'

export const getStorage = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
        return Cookies.get(key) ? JSON.parse(Cookies.get(key)) : defaultValue
    }

    return defaultValue
}

export const setStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        // right now expire is set to 365 days
        return Cookies.set(key, JSON.stringify(data), { expires: 365 })
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

import { gql } from 'apollo-boost'

export const WATCHED_KEY = 'watched__awesome-talks'
export const FAV_KEY = 'favorites__awesome-talks'

const getStorage = key => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || []
  }

  return []
}

export const defaultState = {
  favorites: getStorage(FAV_KEY),
  watched: getStorage(WATCHED_KEY),
  hideViewed: false
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

import { gql } from 'apollo-boost'

export default gql`
  query GetFavorites {
    favorites @client
  }
`

import gql from 'graphql-tag'

export default gql`
  query GetFavorites {
    favorites @client
  }
`

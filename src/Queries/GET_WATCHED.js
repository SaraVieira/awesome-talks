import { gql } from 'apollo-boost'

export default gql`
  query GetWatched {
    watched @client
  }
`

import { gql } from 'apollo-boost'

export default gql`
  query GetSearch {
    search @client
  }
`

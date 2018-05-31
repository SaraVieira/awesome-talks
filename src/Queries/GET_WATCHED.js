import gql from 'graphql-tag'

export default gql`
  query GetWatched {
    watched @client
  }
`

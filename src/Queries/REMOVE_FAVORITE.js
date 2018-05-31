import gql from 'graphql-tag'

export default gql`
  mutation removeFavorite($id: String!) {
    removeFavorite(id: $id) @client
  }
`

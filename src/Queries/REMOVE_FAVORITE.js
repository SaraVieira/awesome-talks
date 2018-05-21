import { gql } from 'apollo-boost'

export default gql`
  mutation removeFavorite($id: String!) {
    removeFavorite(id: $id) @client
  }
`

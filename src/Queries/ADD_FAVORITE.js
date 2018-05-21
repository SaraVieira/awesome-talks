import { gql } from 'apollo-boost'

export default gql`
  mutation addFavorite($id: String!) {
    addFavorite(id: $id) @client
  }
`

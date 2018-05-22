import { gql } from 'apollo-boost'

export default gql`
  mutation removeWatched($id: String!) {
    removeWatched(id: $id) @client
  }
`

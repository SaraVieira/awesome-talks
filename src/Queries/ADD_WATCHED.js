import { gql } from 'apollo-boost'

export default gql`
  mutation addWatched($id: String!) {
    addWatched(id: $id) @client
  }
`

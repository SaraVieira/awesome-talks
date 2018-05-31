import gql from 'graphql-tag'

export default gql`
  mutation removeWatched($id: String!) {
    removeWatched(id: $id) @client
  }
`

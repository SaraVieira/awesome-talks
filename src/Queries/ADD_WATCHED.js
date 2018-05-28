import gql from 'graphql-tag'

export default gql`
  mutation addWatched($id: String!) {
    addWatched(id: $id) @client
  }
`

import gql from 'graphql-tag'

export default gql`
  mutation addFavorite($id: String!) {
    addFavorite(id: $id) @client
  }
`

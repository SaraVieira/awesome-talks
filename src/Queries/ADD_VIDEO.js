import { gql } from 'apollo-boost'

export default gql`
  mutation createVideos($name: String!, $link: String!) {
    createVideos(name: $name, link: $link) {
      id
      name
    }
  }
`

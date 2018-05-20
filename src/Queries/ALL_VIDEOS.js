import { gql } from 'apollo-boost'

export default gql`
  query speakerVideos($first: Int, $after: String) {
    allVideoses(first: $first, after: $after) {
      id
      speaker {
        name
      }
      description
      link
      name
    }
  }
`

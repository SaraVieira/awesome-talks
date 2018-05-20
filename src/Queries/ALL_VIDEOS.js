import { gql } from 'apollo-boost'

export default gql`
  query speakerVideos($first: Int, $after: String, $orderBy: VideosOrderBy) {
    allVideoses(first: $first, after: $after, orderBy: $orderBy) {
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

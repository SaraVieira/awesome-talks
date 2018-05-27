import { gql } from 'apollo-boost'

export default gql`
  query speakerVideos($name: String) {
    allSpeakerses(filter: { name: $name }) {
      id
      name
      twitter
      bio
      photo {
        url
      }
      videoses {
        id
        description
        speaker {
          name
        }
        link
        name
        tags {
          name
          id
        }
      }
    }
  }
`

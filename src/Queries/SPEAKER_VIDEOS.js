import { gql } from 'apollo-boost'

export default gql`
  query speakerVideos($name: String) {
    allSpeakerses(filter: { name: $name }) {
      id
      name
      videoses {
        id
        description
        link
        name
      }
    }
  }
`

import { gql } from 'apollo-boost'

export default gql`
  {
    allSpeakerses {
      name
      id
    }
  }
`

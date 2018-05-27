import { gql } from 'apollo-boost'

export default gql`
  {
    allSpeakerses(orderBy: name_ASC) {
      name
      id
      photo {
        url
      }
    }
  }
`

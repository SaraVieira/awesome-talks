import gql from 'graphql-tag'

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

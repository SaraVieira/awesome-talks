import { gql } from 'apollo-boost'

export default gql`
  {
    allTagses {
      id
      name
      videos {
        id
        description
        link
        name
        tags {
          name
          id
        }
        speaker {
          name
        }
      }
    }
  }
`

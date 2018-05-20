import { gql } from 'apollo-boost'

export default gql`
  {
    allVideoses {
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

import { gql } from "apollo-boost"

export default gql`
  {
    allVideoses {
      speaker {
        name
      }
      description
      link
      name
    }
  }
`

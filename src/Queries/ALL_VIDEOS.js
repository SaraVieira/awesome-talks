import { gql } from "apollo-boost"

export default gql`
  {
    allVideoses {
      speaker
      description
      link
      name
    }
  }
`

import { gql } from 'apollo-boost'

export default gql`
  {
    allTagses {
      name
      id
    }
  }
`

import { gql } from 'apollo-boost'

export default gql`
  {
    allTagses(orderBy: name_ASC) {
      name
      id
    }
  }
`

import gql from 'graphql-tag'

export default gql`
  {
    allTagses(orderBy: name_ASC) {
      name
      id
    }
  }
`

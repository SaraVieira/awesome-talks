import { gql } from 'apollo-boost'

export default gql`
  query getVideo($id: ID) {
    Videos(id: $id) {
      id
      speaker {
        name
      }
      description
      link
      name
      tags {
        name
        id
      }
    }
  }
`

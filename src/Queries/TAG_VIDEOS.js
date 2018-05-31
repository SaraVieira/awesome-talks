import gql from 'graphql-tag'

export default gql`
  query tagVideosw($name: String) {
    allTagses(filter: { name: $name }) {
      id
      name
      videos {
        id
        description
        link
        name
        speaker {
          name
        }
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

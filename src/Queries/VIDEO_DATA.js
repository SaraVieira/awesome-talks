import gql from 'graphql-tag'

export default gql`
    query Video($name: String) {
        video: Videos(name: $name) {
            id
            speaker {
                id
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

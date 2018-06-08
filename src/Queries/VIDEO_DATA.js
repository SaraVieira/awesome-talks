import gql from 'graphql-tag'

export default gql`
    query Video($name: String) {
        allVideoses(filter: { name_contains: $name }) {
            id
            name
            speaker {
                id
                name
                bio
                photo {
                    url
                }
            }
            description
            link
            name
            duration
            tags {
                name
                id
            }
        }
    }
`

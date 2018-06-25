import gql from 'graphql-tag'

export default gql`
    query Video($id: ID!) {
        allVideoses(filter: { id: $id }) {
            id
            name
            speaker {
                id
                name
                bio
                twitter
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

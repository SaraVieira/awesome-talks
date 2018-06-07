import gql from 'graphql-tag'

export default gql`
    query getVideos($ids: [ID!]) {
        allVideoses(filter: { id_in: $ids }) {
            id
            speaker {
                name
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

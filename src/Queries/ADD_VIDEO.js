import gql from 'graphql-tag'

export default gql`
    mutation createVideos(
        $name: String!
        $link: String!
        $moderatorNotes: String
    ) {
        createVideos(
            name: $name
            link: $link
            moderatorNotes: $moderatorNotes
        ) {
            id
            name
        }
    }
`

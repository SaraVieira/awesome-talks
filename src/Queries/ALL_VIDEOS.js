import gql from 'graphql-tag'

export default gql`
    query speakerVideos($first: Int, $after: String, $orderBy: VideosOrderBy) {
        allVideoses(
            first: $first
            after: $after
            orderBy: $orderBy
            filter: { isPublished: true }
        ) {
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

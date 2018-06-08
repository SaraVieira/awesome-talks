import gql from 'graphql-tag'

export default gql`
    query allVideos(
        $first: Int
        $after: String
        $search: String
        $duration: Int
    ) {
        allVideoses(
            first: $first
            after: $after
            orderBy: createdAt_DESC
            filter: {
                AND: [
                    {
                        OR: [
                            { link_contains: $search }
                            { name_contains: $search }
                            { tags_some: { name_contains: $search } }
                            { speaker_some: { name_contains: $search } }
                        ]
                    }
                    {
                        AND: [
                            { isPublished: true }
                            { duration_lte: $duration }
                        ]
                    }
                ]
            }
        ) {
            id
            speaker {
                id
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

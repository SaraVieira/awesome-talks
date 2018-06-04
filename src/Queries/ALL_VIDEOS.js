import gql from 'graphql-tag'

export const ALL_VIDEOS = `
query allVideos($first: Int, $after: String, $search: String) {
        allVideoses(
            first: $first
            after: $after
            orderBy: updatedAt_DESC
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
                    { AND: [{ isPublished: true }] }
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
            tags {
                name
                id
            }
        }
    }`
export default gql`
    ${ALL_VIDEOS}
`

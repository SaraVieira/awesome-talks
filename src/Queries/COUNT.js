import gql from 'graphql-tag'

export default gql`
    query allVideos($search: String) {
        _allVideosesMeta(
            filter: { isPublished: true, name_contains: $search }
        ) {
            count
        }
    }
`

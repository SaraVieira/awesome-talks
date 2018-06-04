import gql from 'graphql-tag'

export default gql`
    {
        allTagses(
            orderBy: name_ASC
            filter: { videos_some: { isPublished: true } }
        ) {
            name
            id
            _videosMeta {
                count
            }
        }
    }
`

import gql from 'graphql-tag'

export default gql`
    query GetTagsSearch {
        searchTags @client
    }
`

import gql from 'graphql-tag'

export default gql`
    query GetSpeakersSearch {
        searchSpeakers @client
    }
`

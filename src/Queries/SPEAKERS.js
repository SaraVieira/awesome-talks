import gql from 'graphql-tag'

export default gql`
    {
        allSpeakerses(
            orderBy: name_ASC
            filter: { videoses_some: { isPublished: true } }
        ) {
            name
            id
            photo {
                url
            }
            _videosesMeta {
                count
            }
        }
    }
`

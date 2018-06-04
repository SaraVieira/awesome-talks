import gql from 'graphql-tag'

export const ALL_SPEAKRS = `{
        allSpeakerses(orderBy: name_ASC) {
            name
            id
            photo {
                url
            }
        }
    }`
export default gql`
    ${ALL_SPEAKRS}
`

import gql from 'graphql-tag'

export const ALL_TAGS = `
    {
        allTagses(orderBy: name_ASC) {
            name
            id
        }
    }
`

export default gql`
    ${ALL_TAGS}
`

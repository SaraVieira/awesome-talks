import gql from 'graphql-tag'

export default gql`
    mutation switchMode($id: String!) {
        switchMode(id: $id) @client
    }
`
export const GET_MODE = gql`
    query GetMode {
        mode @client
    }
`

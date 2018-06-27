import gql from 'graphql-tag'
import VideoData from './Fragments/Video'

export default gql`
    query Video($id: ID!) {
        allVideoses(filter: { id: $id }) {
            ...VideoData
            speaker {
                id
                name
                bio
                twitter
                photo {
                    url
                }
            }
        }
    }
    ${VideoData}
`

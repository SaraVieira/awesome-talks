import gql from 'graphql-tag'
import VideoData from './Fragments/Video'

export default gql`
    query getVideos($ids: [ID!]) {
        allVideoses(filter: { id_in: $ids }) {
            ...VideoData
        }
    }
    ${VideoData}
`

import { gql } from 'apollo-boost'

export default gql`
  query getVideos($ids: [ID!]) {
    allVideoses(filter: { id_in: $ids }) {
      id
      speaker {
        name
      }
      description
      link
      name
      tags {
        name
        id
      }
    }
  }
`

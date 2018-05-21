import { Col, Row } from 'react-styled-flexboxgrid'
import Video from './Video'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import COUNT from '../Queries/COUNT'
import Scroll from './Scroll'
import Query from './Query'

const getMore = (fetchMore, allVideoses) =>
  fetchMore({
    variables: {
      first: 9,
      after: allVideoses[allVideoses.length - 1].id
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) return prev
      return {
        allVideoses: [...prev.allVideoses, ...fetchMoreResult.allVideoses]
      }
    }
  })

export default () => (
  <Query
    query={ALL_VIDEOS}
    variables={{
      first: 9,
      orderBy: 'link_ASC'
    }}
  >
    {({ data: { allVideoses }, fetchMore }) => {
      const videos = allVideoses
      return (
        <Row style={{ justifyContent: 'center' }}>
          <Col xs={12}>
            <Row>{videos.map(v => <Video key={v.id} {...v} />)}</Row>

            <Query query={COUNT}>
              {({ data: { _allVideosesMeta } }) => (
                <Scroll
                  show={_allVideosesMeta.count > allVideoses.length}
                  onBottom={() => getMore(fetchMore, videos)}
                />
              )}
            </Query>
          </Col>
        </Row>
      )
    }}
  </Query>
)

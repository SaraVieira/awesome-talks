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

const arr = [
  'createdAt_ASC',
  'description_ASC',
  'description_DESC',
  'id_ASC',
  'id_DESC',
  'isPublished_ASC',
  'isPublished_DESC',
  'link_ASC',
  'link_DESC',
  'name_ASC',
  'name_DESC',
  'updatedAt_ASC',
  'updatedAt_DESC'
]

const rand = arr[Math.floor(Math.random() * arr.length)]

export default () => (
  <Query
    query={ALL_VIDEOS}
    variables={{
      first: 9,
      orderBy: rand
    }}
  >
    {({ data: { allVideoses }, fetchMore }) => {
      return (
        <Row style={{ justifyContent: 'center' }}>
          <Col xs={12}>
            <Row>{allVideoses.map(v => <Video key={v.id} {...v} />)}</Row>

            <Query query={COUNT}>
              {({ data: { _allVideosesMeta } }) => (
                <Scroll
                  show={_allVideosesMeta.count > allVideoses.length}
                  onBottom={() => getMore(fetchMore, allVideoses)}
                />
              )}
            </Query>
          </Col>
        </Row>
      )
    }}
  </Query>
)

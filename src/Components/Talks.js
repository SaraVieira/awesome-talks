// import styled from 'styled-components'
import { Col, Row } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
import Video from './Video'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'

export default () => (
  <Row style={{ justifyContent: 'center' }}>
    <Col xs={12}>
      <Query query={ALL_VIDEOS}>
        {({ loading, error, data: { allVideoses } }) => {
          if (loading) return <div>Loading...</div>
          if (error) return `Error!: ${error}`
          return <Row>{allVideoses.map(v => <Video key={v.id} {...v} />)}</Row>
        }}
      </Query>
    </Col>
  </Row>
)

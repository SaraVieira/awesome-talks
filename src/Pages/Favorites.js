import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import Video from './../Components/Video'
import GET_FAVORITES from '../Queries/GET_FAVORITES'
import GET_VIDEO from '../Queries/GET_VIDEO'

export default () => (
  <Grid>
    <Header title="Favorites" noSearch />
    <Row>
      <Col xs={12}>
        <Query query={GET_FAVORITES}>
          {({ data: { favorites } }) => (
            <Row>
              {favorites.map(id => (
                <Query key={id} query={GET_VIDEO} variables={{ id }}>
                  {({ data: { Videos: v } }) => <Video key={v.id} talk={v} />}
                </Query>
              ))}
            </Row>
          )}
        </Query>
      </Col>
    </Row>
  </Grid>
)

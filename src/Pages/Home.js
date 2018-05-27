import { Component } from 'preact'
import { Grid } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
import GET_SEARCH from '../Queries/GET_SEARCH'
import Header from './../Components/Header'
import Talks from './../Components/Talks'

export default class Home extends Component {
  state = {
    params: { name: '' }
  }

  render(
    { handle },
    {
      params: { name }
    }
  ) {
    return (
      <Grid>
        <Header />
        <Query query={GET_SEARCH}>
          {({ data: { search }, client }) => <Talks search={search} />}
        </Query>
      </Grid>
    )
  }
}

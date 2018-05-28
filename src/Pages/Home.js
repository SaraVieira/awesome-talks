import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
import GET_SEARCH from '../Queries/GET_SEARCH'
import Header from './../Components/Header'
import Talks from './../Components/Talks'

export default () => (
  <Grid>
    <Header />
    <Query query={GET_SEARCH}>
      {({ data: { search }, client }) => <Talks search={search} />}
    </Query>
  </Grid>
)

import React from 'react'
import { Grid } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
import GET_SEARCH from '../Queries/GET_SEARCH'
import Header from './../Components/Header'
import Talks from './../Components/Talks'
import Nav from './../Components/Nav'

export default () => (
  <Grid>
    <Nav />
    <Header />
    <Query query={GET_SEARCH}>
      {({ data: { search }, client }) => <Talks search={search} />}
    </Query>
  </Grid>
)

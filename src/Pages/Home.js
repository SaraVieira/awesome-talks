import { Component } from 'preact'
import { Grid } from 'react-styled-flexboxgrid'
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
        <Header
          onSearch={({ term }) => this.setState({ params: { name: term } })}
        />
        <Talks search={name} />
      </Grid>
    )
  }
}

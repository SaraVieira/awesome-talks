import { Component } from 'preact'
import { Grid } from 'react-styled-flexboxgrid'
import Header from './../Components/Header'
import Talks from './../Components/Talks'
import VideoProvider from '../Components/VideoProvider'

/* eslint-disable react/no-deprecated */
export default class Home extends Component {
  state = {
    params: { name: '' }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ params: nextProps.params })
  }

  render() {
    return (
      <VideoProvider params={this.state.params}>
        {({ allVideoses }) => (
          <Grid>
            <Header
              allVideoses={allVideoses}
              onSearch={({ term }) => this.setState({ params: { name: term } })}
            />
            <Talks talks={allVideoses} />
          </Grid>
        )}
      </VideoProvider>
    )
  }
}

import React, { Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import shuffle from 'shuffle-array'
import Flex from 'styled-flex-component'
import { graphql, compose } from 'react-apollo'
import Fuse from 'fuse.js'
import Video from './Video'
import { Title } from './../Components/Header'
import Query from './Query'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import SHOW_VIEWED from '../Queries/SHOW_VIEWED'
import GET_WATCHED from '../Queries/GET_WATCHED'

const shuffleArr = arr => shuffle(arr, { copy: true })

class TalksComponent extends Component {
    state = {
      videos: this.props.talks,
      noLazy: false
    }

    componentDidUpdate = prevProps => {
      const { search, watched, talks, hideViewed } = this.props
      var options = {
        keys: ['name', 'speaker.name', 'tags.name'],
        shouldSort: true,
        threshold: 0.2
      }

      if (hideViewed !== prevProps.hideViewed) {
        const allTalks =
                hideViewed && !prevProps.hideViewed
                  ? talks.filter(t => !watched.includes(t.id))
                  : talks
        this.setState({
          videos: allTalks,
          noLazy: false
        })
      }

      if (
        search !== prevProps.search &&
            search === '' &&
            prevProps.search !== ''
      ) {
        this.setState({
          videos: talks,
          noLazy: false
        })
      }

      if (search !== prevProps.search && search !== '') {
        const fuse = new Fuse(this.props.talks, options)
        const videos = fuse.search(search)
        this.setState({ videos, noLazy: true })
      }
    }

    render = () => {
      return (
        <Col xs={12}>
          <Row>
            {!this.state.videos.length ? (
              <Flex justifyCenter full>
                <Title small>No videos match your query</Title>
              </Flex>
            ) : null}
            {this.state.videos.map(v => (
              <Video noLazy={this.state.noLazy} key={v.id} talk={v} />
            ))}
          </Row>
        </Col>
      )
    }
}

const Talks = compose(
  graphql(SHOW_VIEWED, {
    ssr: false,
    props: ({ data }) => ({ hideViewed: data.hideViewed })
  }),
  graphql(GET_WATCHED, {
    ssr: false,
    props: ({ data }) => ({ watched: data.watched })
  })
)(TalksComponent)

const VideoComponent = ({ search }) => (
  <Query query={ALL_VIDEOS}>
    {({ data: { allVideoses } }) => (
      <Row>
        <Talks search={search} talks={shuffleArr(allVideoses)} />
      </Row>
    )}
  </Query>
)

export default VideoComponent

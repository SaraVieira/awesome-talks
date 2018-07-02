import Flex from 'styled-flex-component'
import { graphql, compose } from 'react-apollo'
import { Col, Row } from 'react-styled-flexboxgrid'
import Video from './Video'
import { Title } from './../Components/Header'
import SHOW_VIEWED from '../Queries/Local/SHOW_VIEWED'
import ADD_WATCHED from '../Queries/Local/ADD_WATCHED'
import GET_WATCHED from '../Queries/Local/GET_WATCHED'
import React, { Component } from 'react'

class TalksComponent extends Component {
    state = {
        videos: this.props.talks,
        noLazy: false
    }

    componentDidUpdate = prevProps => {
        const { watched, talks, hideViewed } = this.props

        if (talks !== prevProps.talks || hideViewed !== prevProps.hideViewed) {
            const videos =
                hideViewed && !prevProps.hideViewed
                    ? talks.filter(t => !watched.includes(t.id))
                    : talks

            this.setState({ videos })
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
                        <Video
                            noLazy={this.state.noLazy}
                            key={v.id}
                            talk={v}
                            addWatched={this.props.addWatched}
                        />
                    ))}
                </Row>
            </Col>
        )
    }
}

export default compose(
    graphql(SHOW_VIEWED, {
        ssr: false,
        props: ({ data }) => ({ hideViewed: data.hideViewed })
    }),
    graphql(GET_WATCHED, {
        ssr: false,
        props: ({ data }) => ({ watched: data.watched })
    }),
    graphql(ADD_WATCHED, {
        props: ({ mutate }) => ({
            addWatched: id => mutate({ variables: { id } })
        })
    })
)(TalksComponent)

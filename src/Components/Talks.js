import React, { Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { graphql, compose } from 'react-apollo'
// import Fuse from 'fuse.js'
import Video from './Video'
import { Title } from './../Components/Header'
import Query from './Query'
import Scroll from './Scroll'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import SHOW_VIEWED from '../Queries/SHOW_VIEWED'
import ADD_WATCHED from '../Queries/ADD_WATCHED'
import GET_WATCHED from '../Queries/GET_WATCHED'
import COUNT from '../Queries/COUNT'

const getMore = (fetchMore, allVideoses) =>
    fetchMore({
        variables: {
            first: 9,
            after: allVideoses[allVideoses.length - 1].id
        },
        updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev
            return {
                allVideoses: [
                    ...prev.allVideoses,
                    ...fetchMoreResult.allVideoses
                ]
            }
        }
    })

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

const Talks = compose(
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

const VideoComponent = ({ search }) => (
    <Query
        query={ALL_VIDEOS}
        variables={{
            first: 9,
            search
        }}
    >
        {({ data: { allVideoses }, fetchMore }) => {
            return (
                <Row style={{ justifyContent: 'center' }}>
                    <Col xs={12}>
                        <Row>
                            <Talks search={search} talks={allVideoses} />
                        </Row>

                        <Query
                            query={COUNT}
                            variables={{
                                search
                            }}
                        >
                            {({ data: { _allVideosesMeta } }) => (
                                <Scroll
                                    show={
                                        _allVideosesMeta.count >
                                        allVideoses.length
                                    }
                                    onBottom={() =>
                                        getMore(fetchMore, allVideoses)
                                    }
                                />
                            )}
                        </Query>
                    </Col>
                </Row>
            )
        }}
    </Query>
)

export default VideoComponent

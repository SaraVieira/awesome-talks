import React, { Fragment, Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
// import Fuse from 'fuse.js'
import Query from './Query'
import Scroll from './Scroll'
import Talks from './TalksList'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
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

class VideoComponent extends Component {
    state = {
        duration: undefined
    }
    setDurationFilter = duration => {
        this.setState({
            duration
        })
    }
    render() {
        const { search } = this.props
        const { duration } = this.state
        return (
            <Fragment>
                <Filters onClick={this.setDurationFilter} />
                <Query
                    query={ALL_VIDEOS}
                    variables={{
                        first: 9,
                        search,
                        duration
                    }}
                >
                    {({ data: { allVideoses }, fetchMore }) => {
                        return (
                            <Row style={{ justifyContent: 'center' }}>
                                <Col xs={12}>
                                    <Row>
                                        <Talks
                                            search={search}
                                            talks={allVideoses}
                                        />
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
                                                    getMore(
                                                        fetchMore,
                                                        allVideoses
                                                    )
                                                }
                                            />
                                        )}
                                    </Query>
                                </Col>
                            </Row>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

const Filters = ({ onClick }) => (
    <div>
        <button
            style={{ marginRight: 10 }}
            className="active_nav link"
            onClick={() => {
                onClick(1200)
            }}
        >
            Less that 20 min
        </button>
        <button
            style={{ marginRight: 10 }}
            className="active_nav link"
            onClick={() => {
                onClick(2700)
            }}
        >
            Less that 45 min
        </button>
        <button
            style={{ marginRight: 10 }}
            className="active_nav link"
            onClick={() => {
                onClick(undefined)
            }}
        >
            All
        </button>
    </div>
)
export default VideoComponent

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
        duration: undefined,
        year: undefined
    }
    setDurationFilter = duration => {
        this.setState({
            duration
        })
    }
    setPublishYear = year => {
        this.setState({
            year
        })
    }
    render() {
        const { search } = this.props
        const { duration, year } = this.state
        return (
            <Fragment>
                Filters
                <DurationFilter onClick={this.setDurationFilter} />
                <PublishedYearFilter onClick={this.setPublishYear} />
                <Query
                    query={ALL_VIDEOS}
                    variables={{
                        first: 9,
                        search,
                        duration,
                        year
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

const DurationFilter = ({ onClick }) => (
    <div>
        <span>Duration</span>
        <br />
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

const PublishedYearFilter = ({ onClick }) => (
    <div style={{ padding: 5 }}>
        <span>Published year</span>
        <br />
        <PublishedYearButton
            value={new Date().getFullYear() - 3}
            onClick={onClick}
        />
        <PublishedYearButton
            value={new Date().getFullYear() - 2}
            onClick={onClick}
        />
        <PublishedYearButton
            value={new Date().getFullYear() - 1}
            onClick={onClick}
        />
        <PublishedYearButton
            value={new Date().getFullYear()}
            onClick={onClick}
        />
        <PublishedYearButton value={undefined} onClick={onClick} />
    </div>
)

const PublishedYearButton = ({ value, onClick }) => (
    <button
        style={{ marginRight: 10 }}
        className="active_nav link"
        onClick={() => {
            onClick(value)
        }}
    >
        {value || 'All'}
    </button>
)

export default VideoComponent

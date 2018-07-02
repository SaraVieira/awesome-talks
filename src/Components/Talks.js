import React, { Fragment } from 'react'
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

const VideoComponent = ({ search }) => (
    <Fragment>
        Filters
        <Query
            query={ALL_VIDEOS}
            variables={{
                first: 9,
                search,
                duration: undefined
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
    </Fragment>
)

export default VideoComponent

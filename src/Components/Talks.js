import React, { Fragment, Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import remcalc from 'remcalc'
import Query from './Query'
import Scroll from './Scroll'
import Talks from './TalksList'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import COUNT from '../Queries/COUNT'

import PublishedYearFilter from './Filters/Year'
import DurationFilter from './Filters/Duration'
import Order from './Filters/Order'

import { Title } from './Styling/Text'

const Icon = styled(FontAwesomeIcon)`
    margin-right: ${remcalc(10)};
    display: block;
    cursor: pointer;
`

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
        year: undefined,
        order: 'createdAt_DESC',
        filtersOpened: false
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

    changeOrder = e => {
        this.setState({
            order: e.target.value
        })
    }

    toggleFilters = () => {
        this.setState({
            filtersOpened: !this.state.filtersOpened
        })
    }

    render() {
        const { search } = this.props
        const { duration, year, order, filtersOpened } = this.state
        return (
            <Fragment>
                <Title>
                    <Flex
                        role="button"
                        tabindex="0"
                        onClick={this.toggleFilters}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.toggleFilters()
                            }
                        }}
                    >
                        {filtersOpened ? (
                            <Icon icon="chevron-up" />
                        ) : (
                            <Icon icon="chevron-down" />
                        )}
                        Filters
                    </Flex>
                </Title>
                {filtersOpened ? (
                    <Flex
                        wrap
                        alignCenter
                        justifyBetween
                        style={{ marginBottom: 40 }}
                    >
                        <DurationFilter
                            duration={duration}
                            onClick={this.setDurationFilter}
                        />
                        <PublishedYearFilter
                            year={year}
                            onClick={this.setPublishYear}
                        />
                        <Order onChange={this.changeOrder} />
                    </Flex>
                ) : null}
                <Query
                    query={ALL_VIDEOS}
                    variables={{
                        first: 9,
                        search,
                        duration,
                        year,
                        order
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

export default VideoComponent

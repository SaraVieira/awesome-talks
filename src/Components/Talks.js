import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'
import { Col, Row } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import Query from './Query'
import Scroll from './Scroll'
import Talks from './TalksList'
import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import COUNT from '../Queries/COUNT'

const Name = styled.h4`
    font-weight: 700;
    font-size: ${remcalc(20)};
    color: ${props => props.theme.main};
    line-height: 1 !important;
    margin: 0;
    margin-right: ${remcalc(10)};
    padding-left: 0;
    word-break: break-all;
    border: 0;
    display: block;

    @media (max-width: ${remcalc(768)}) {
        width: 100%;
        margin: ${remcalc(10)} 0;
    }
`

const Title = Name.extend`
    margin: ${remcalc(20)} 0;
    font-size: ${remcalc(30)};
`

const Button = styled.button`
    height: ${remcalc(35)};
    border: 2px solid #5e8eaa;
    background: white;
    color: black;
    opacity: 0.8;
    font-size: 16px;
    font-weight: bold;
    transition: all 200ms ease;
    cursor: pointer;

    ${is('selected')`
        color: white;
        background: #5e8eaa;
    `};
`

const Select = styled.select`
    height: ${remcalc(35)};
    border: 2px solid #5e8eaa;
    color: black;
    opacity: 0.8;
    width: ${remcalc(190)};
    font-size: 16px;
    font-weight: bold;
`

const Checkbox = styled.div`
    user-select: none;
    position: relative;
    width: ${remcalc(40)};
    margin-left: ${remcalc(-17)};
    margin-right: ${remcalc(20)};

    input[type='checkbox'] {
        opacity: 0;
    }

    label {
        position: relative;
    }
    label::before,
    label::after {
        position: absolute;
    }
    /*Outer-box*/
    label::before {
        top: ${remcalc(11)};
    }
    /*Checkmark*/
    label::after {
        left: ${remcalc(4)};
        top: ${remcalc(15)};
    }

    /*Hide the checkmark by default*/
    input[type='checkbox'] + label::after {
        content: none;
    }

    input[type='checkbox']:focus + label::before {
        outline: rgb(59, 153, 252) auto 5px;
    }
    /*Unhide the checkmark on the checked state*/
    input[type='checkbox']:checked + label::after {
        content: '';
    }

    label::before {
        content: '';
        display: inline-block;

        height: 16px;
        width: 16px;

        border: 1px solid;
    }

    label::after {
        content: '';
        display: inline-block;
        height: 6px;
        width: 9px;
        border-left: 2px solid #5e8eaa;
        border-bottom: 2px solid #5e8eaa;

        transform: rotate(-45deg);
    }
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
                    <Flex>
                        <Checkbox>
                            <input
                                type="checkbox"
                                onChange={this.toggleFilters}
                                checked={filtersOpened}
                                id="filters"
                            />
                            <label htmlFor="filters" />
                        </Checkbox>
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

const Order = ({ onChange }) => (
    <Flex alignCenter>
        <Name>Order</Name>
        <Select onChange={onChange}>
            <option value="createdAt_DESC">Created At (DESC)</option>
            <option value="createdAt_ASC">Created At (ASC)</option>
            <option value="duration_DESC">Duration (DESC)</option>
            <option value="duration_ASC">Duration (ASC)</option>
            <option value="likes_DESC">Likes (DESC)</option>
            <option value="likes_ASC">Likes (ASC)</option>
            <option value="name_DESC">Name (DESC)</option>
            <option value="name_ASC">Name (ASC)</option>
            <option value="views_DESC">Views (DESC)</option>
            <option value="views_ASC">Views (ASC)</option>
            <option value="year_DESC">Year (DESC)</option>
            <option value="year_ASC">Year (ASC)</option>
        </Select>
    </Flex>
)

const DurationFilter = ({ onClick, duration }) => (
    <Flex wrap alignCenter>
        <Name>Duration</Name>
        <Button
            selected={duration === 1200}
            style={{ marginRight: 10 }}
            className="no-hover"
            onClick={() => {
                onClick(1200)
            }}
        >
            Less that 20 min
        </Button>
        <Button
            selected={duration === 2700}
            style={{ marginRight: 10 }}
            className="no-hover"
            onClick={() => {
                onClick(2700)
            }}
        >
            Less that 45 min
        </Button>
        <Button
            selected={duration === undefined}
            style={{ marginRight: 10 }}
            className="no-hover"
            onClick={() => {
                onClick(undefined)
            }}
        >
            All
        </Button>
    </Flex>
)

const PublishedYearFilter = ({ onClick, year }) => (
    <Flex wrap alignCenter>
        <Name>Published year</Name>
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear() - 3}
            onClick={onClick}
        />
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear() - 2}
            onClick={onClick}
        />
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear() - 1}
            onClick={onClick}
        />
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear()}
            onClick={onClick}
        />
        <PublishedYearButton year={year} value={undefined} onClick={onClick} />
    </Flex>
)

const PublishedYearButton = ({ value, onClick, year }) => (
    <Button
        style={{ marginRight: 10 }}
        className="no-hover"
        selected={year === value}
        onClick={() => {
            onClick(value)
        }}
    >
        {value || 'All'}
    </Button>
)

export default VideoComponent

import React, { Fragment } from 'react'
import Header from './../Components/Header'
import styled, { css } from 'styled-components'
import is from 'styled-is'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Query from './../Components/Query'
import { graphql } from 'react-apollo'
import Carousel from 'react-fluid-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import remcalc from 'remcalc'

import TAGS from '../Queries/TAGS'
import Nav from './../Components/Nav'
import TagsMeta from '../Components/MetaTags/Tags'
import Filter from '../Utils/search'
import GET__TAGS_SEARCH from '../Queries/Local/GET__TAGS_SEARCH'
import Tag from '../Components/Tag'
import CookieBanner from './../Components/CookieBanner'
import { SimpleVideo as Video } from './../Components/Video'
import Player from './../Components/Player'

const commonStyles = css`
    cursor: pointer;
    z-index: 10;
    position: absolute;
    color: ${props => props.theme.secondary};
    top: 0;
    transition: transform 200ms ease;

    &:hover {
        transform: scale(1.2);
    }

    ${is('disabled')`
        opacity: 0.3;
        cursor: inherit;

         &:hover {
             transform: none;
         }
    `};
`

const PrevButton = ({ disabled, onClick }) => {
    const Prev = styled(FontAwesomeIcon)`
        ${commonStyles};
        left: ${remcalc(20)};
    `
    return (
        <Prev
            size="lg"
            tabindex="0"
            role="button"
            aria-label="Previous Talks"
            icon="chevron-left"
            disabled={disabled}
            onClick={onClick}
        />
    )
}

const NextButton = ({ disabled, onClick }) => {
    const Next = styled(FontAwesomeIcon)`
        ${commonStyles};
        right: ${remcalc(20)};
    `
    return (
        <Next
            disabled={disabled}
            onClick={onClick}
            size="lg"
            tabindex="0"
            role="button"
            aria-label="Next Talks"
            icon="chevron-right"
        />
    )
}

const ProgressUnit = ({ enabled }) => {
    const Progress = styled.div`
        width: ${remcalc(10)};
        height: ${remcalc(10)};
        border-radius: 50%;
        background: ${props => props.theme.secondary};

        ${is('enabled')`
            background: ${props => props.theme.green};
        `};
    `
    return <Progress enabled={enabled} />
}

const VideoWrapper = styled.div`
    height: 180px;
    width: 240px;
`

const Tags = ({ data: { searchTags } }) => (
    <Grid>
        <TagsMeta />
        <div role="banner">
            <Nav />
            <Header
                title="Categories"
                code
                query={GET__TAGS_SEARCH}
                keyName="searchTags"
            />
        </div>
        <Row>
            <Col xs={12}>
                <main>
                    <Query query={TAGS}>
                        {({ data: { allTagses: allTags } }) => (
                            <Fragment>
                                {Filter(searchTags, allTags).map(t => {
                                    return (
                                        <Fragment key={t.id}>
                                            <div>
                                                <Tag
                                                    className="no-hover"
                                                    {...t}
                                                />
                                            </div>

                                            <Carousel
                                                renderProgress={ProgressUnit}
                                                speed={1000}
                                                renderPrev={PrevButton}
                                                renderNext={NextButton}
                                            >
                                                {t.videos.map(video => {
                                                    return (
                                                        <VideoWrapper
                                                            key={video.id}
                                                        >
                                                            <Video
                                                                {...video}
                                                                Player={Player}
                                                                noText
                                                            />
                                                        </VideoWrapper>
                                                    )
                                                })}
                                            </Carousel>
                                        </Fragment>
                                    )
                                })}
                            </Fragment>
                        )}
                    </Query>
                </main>
            </Col>
        </Row>
        <CookieBanner />
    </Grid>
)

export default graphql(GET__TAGS_SEARCH)(Tags)

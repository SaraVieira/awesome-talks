import React, { Component, Fragment } from 'react'
import Header from './../Components/Header'
import { Row, Grid, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'

import Query from './../Components/Query'
import Nav from './../Components/Nav'
import styled from 'styled-components'
import Tag from '../Components/Styling/Tag'
import Player from '../Components/Player'
import { graphql, compose } from 'react-apollo'
import VIDEO_DATA from '../Queries/VIDEO_DATA'
import ADD_WATCHED from '../Queries/Local/ADD_WATCHED'
import { getDuration } from '../Utils/youtube'
import Flex from 'styled-flex-component'
import Error404 from './../Components/Errors/Error404'
import VideoMeta from '../Components/MetaTags/Video'
import { SpeakerInfo } from './../Pages/Speaker'

const URLify = string => string.trim().replace(/\s/g, '%20')

const Description = styled.p`
    font-weight: 400;
    font-size: ${remcalc(16)};
    color: ${props => props.theme.main};
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
`

const Duration = styled.span`
    font-weight: 400;
    color: ${props => props.theme.main};
`

const HeaderStyled = styled(Header)`
    margin-bottom: ${remcalc(20)};
`

const PlayerStyled = styled.main`
    max-width: ${remcalc(1216)};
    margin: auto;
    margin-bottom: ${remcalc(20)};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

const VideoInfo = ({
    name,
    description,
    speaker,
    id,
    tags,
    duration,
    link
}) => (
    <Fragment>
        <VideoMeta name={name} link={link} description={description} />
        <Flex column style={{ marginBottom: remcalc(40) }}>
            {duration ? <Duration>{getDuration(duration)}</Duration> : null}
            <div>
                {tags.map(s => (
                    <Tag key={s.id} to={makeLink('category', s.name)}>
                        #{s.name.toLowerCase()}
                    </Tag>
                ))}
            </div>
            <Description>{description}</Description>
            <a
                className="no-hover"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet/?text=${URLify(
                    `Amazing Tech Talk - ${name} by @${
                        speaker[0].twitter
                    } via @talksawesome`
                )}.&amp;url=${URLify(window.location.href)}`}
            >
                Share on Twitter
            </a>
        </Flex>
        <Row>
            <Col xs={12}>
                {speaker.map(s => (
                    <Fragment key={`${s.id}_${id}`}>
                        <HeaderStyled medium title="Speaker" noSearch />
                        <SpeakerInfo {...s} videoPage />
                    </Fragment>
                ))}
            </Col>
        </Row>
    </Fragment>
)

class VideoComponent extends Component {
    state = { showVideo: false }

    endVideo = id => {
        if (id) this.props.addWatched(id)
        this.setState(({ showVideo }) => ({ showVideo: false }))
    }

    showVideo = () => this.setState(({ showVideo }) => ({ showVideo: true }))

    render() {
        const id = this.props.match.params.id
        return (
            <Fragment>
                <Grid>
                    <div role="banner">
                        <Nav />
                    </div>
                </Grid>
                <Query query={VIDEO_DATA} variables={{ id }}>
                    {({ data: { allVideoses } }) => {
                        const { showVideo } = this.state

                        if (!allVideoses.length) {
                            return <Error404 />
                        }

                        return (
                            <Fragment>
                                <Grid>
                                    <Row>
                                        <Col xs={12}>
                                            <HeaderStyled
                                                medium
                                                title={allVideoses[0].name}
                                                noSearch
                                            />
                                        </Col>
                                    </Row>
                                </Grid>

                                <PlayerStyled>
                                    <Player
                                        videoPage
                                        showVideo={showVideo}
                                        videoMode
                                        hq
                                        id={allVideoses[0].id}
                                        link={allVideoses[0].link}
                                        name={allVideoses[0].name}
                                        onClick={this.showVideo}
                                        onEnd={() =>
                                            this.endVideo(allVideoses[0].id)
                                        }
                                    />
                                </PlayerStyled>
                                <Grid>
                                    <Row>
                                        <Col xs={12}>
                                            <VideoInfo {...allVideoses[0]} />
                                        </Col>
                                    </Row>
                                </Grid>
                            </Fragment>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

const VideoPage = compose(
    graphql(ADD_WATCHED, {
        props: ({ mutate }) => ({
            addWatched: id => mutate({ variables: { id } })
        })
    })
)(VideoComponent)

export default VideoPage

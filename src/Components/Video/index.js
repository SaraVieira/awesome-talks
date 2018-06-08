import styled from 'styled-components'
import React, { Component, Fragment } from 'react'
import Flex from 'styled-flex-component'
import { Link } from 'react-router-dom'
import remcalc from 'remcalc'

import Tag from '../Styling/Tag'
import Player from '../Player'
import { getDuration } from './../../Utils/youtube'
import { Col } from 'react-styled-flexboxgrid'

const Speaker = styled.p`
    margin-bottom: 0;
    margin-top: ${remcalc(5)};
    a {
        display: block;
        text-align: left;
        padding-bottom: ${remcalc(4)};
        line-height: 1;
        border: 0;
        margin-top: ${remcalc(10)};
        font-size: ${remcalc(12)};
        color: ${props => props.theme.darkGrey};
        padding-left: 0;
        transition: color 200ms ease;
    }
`

const Name = styled(Link)`
    font-weight: 700;
    font-size: ${remcalc(24)};
    color: ${props => props.theme.main};
    line-height: 1 !important;
    margin-bottom: ${remcalc(10)};
    margin-top: 0;
    padding-left: 0;
    word-break: break-all;
    border: 0;
    display: block;
`
const Column = styled(Col)`
    transition: all 200ms ease;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: ${remcalc(40)};
`

const Description = styled.p`
    opacity: 0.8;
    font-family: Montserrat-Light;
    font-size: ${remcalc(14)};
    color: ${props => props.theme.main};
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
`

const Duration = styled.span`
    margin-bottom: ${remcalc(10)};
    display: block;
    margin-top: ${remcalc(-5)};
    opacity: 0.8;
    font-weight: 400;
    position: relative
    right: ${remcalc(10)};
    top: ${remcalc(15)};
    color: ${props => props.theme.main};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

export class SimpleVideo extends Component {
    state = { showVideo: false }

    showVideo = () => this.setState(({ showVideo }) => ({ showVideo: true }))

    endVideo = id => {
        if (id) this.props.addWatched(id)
        this.setState(({ showVideo }) => ({ showVideo: false }))
    }

    videoTitle = name =>
        name.length > 60 ? `${name.substring(0, 60)}...` : name

    render = () => {
        const {
            speaker,
            description,
            link,
            name,
            duration,
            tags,
            id,
            cinemaMode,
            showCinemaVideo,
            Player,
            toggleCinemaMode
        } = this.props

        const { showVideo } = this.state

        return (
            <Fragment>
                <Column md={4} sm={6} xs={9}>
                    <Player
                        cinemaMode={cinemaMode}
                        showVideo={showVideo || showCinemaVideo}
                        id={id}
                        onClick={this.showVideo}
                        link={link}
                        name={name}
                        toggleCinemaMode={toggleCinemaMode}
                        onEnd={() => this.endVideo(id)}
                    />

                    <Flex justifyBetween alignCenter>
                        <Speaker>
                            {speaker.map(s => (
                                <Link
                                    key={`${s.id}_${id}`}
                                    to={makeLink('speaker', s.name)}
                                    className="no-hover"
                                >
                                    {s.name}
                                </Link>
                            ))}
                        </Speaker>
                        {duration ? (
                            <Duration>{getDuration(duration)}</Duration>
                        ) : null}
                    </Flex>
                    <Name
                        className="no-hover"
                        to={makeLink('video', id)}
                        title={name}
                    >
                        {this.videoTitle(name)}
                    </Name>
                    <Flex>
                        {tags.map(s => (
                            <Tag key={s.id} to={makeLink('category', s.name)}>
                                #{s.name.toLowerCase()}
                            </Tag>
                        ))}
                    </Flex>

                    {cinemaMode && description ? (
                        <Description>{description}</Description>
                    ) : null}
                </Column>
            </Fragment>
        )
    }
}

const VideoWrapper = props => <SimpleVideo {...props} Player={Player} />

export default ({ noLazy = false, talk, addWatched }) => (
    <VideoWrapper key={talk.id} {...talk} addWatched={addWatched} />
)

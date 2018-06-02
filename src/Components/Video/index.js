import styled from 'styled-components'
import React, { Component } from 'react'
import Flex from 'styled-flex-component'
import { Link } from 'react-router-dom'
import remcalc from 'remcalc'

import Tag from '../Styling/Tag'
import Player from '../Player'
import CinemaMode from '../CinemaMode'
import { getDuration } from './../../Utils/youtube'

const Speaker = styled.p`
    padding-left: ${remcalc(20)};
    a {
        min-width: ${remcalc(50)};
        display: block;
        padding: ${remcalc(5)};
        text-align: center;

        &:after {
            left: 0;
        }
    }
`

const Name = styled.h2`
    font-size: 300;
    font-size: ${remcalc(20)};
    color: ${props => props.theme.black};
    line-height: ${remcalc(25)};
    letter-spacing: ${remcalc(-0.01)};
`

const Description = styled.p`
    opacity: 0.8;
    font-family: Montserrat-Light;
    font-size: ${remcalc(14)};
    color: ${props => props.theme.black};
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
`

const Duration = styled.span`
    margin-bottom: ${remcalc(10)};
    display: block;
    margin-top: ${remcalc(-5)};
    opacity: 0.8;
    font-weight: 500;
    color: ${props => props.theme.darkGrey};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

export class SimpleVideo extends Component {
    state = { showVideo: false, duration: null }

    showVideo = () => this.setState(({ showVideo }) => ({ showVideo: true }))

    endVideo = id => {
        this.props.addWatched(id)
        this.setState(({ showVideo }) => ({ showVideo: false }))
    }

    componentDidMount = async () => {
        const duration = await getDuration(this.props.link)

        this.setState({ duration })
    }

    videoTitle = name =>
        name.length > 40 ? `${name.substring(0, 40)}...` : name

    render = () => {
        const {
            speaker,
            description,
            link,
            name,
            tags,
            id,
            cinemaMode,
            showCinemaVideo,
            Player,
            toggleCinemaMode
        } = this.props

        const { showVideo } = this.state

        return (
            <span>
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
                    <Name title={name}>{this.videoTitle(name)}</Name>
                    <Speaker>
                        {speaker.map(s => (
                            <Link key={s.id} to={makeLink('speaker', s.name)}>
                                <span>{s.name}</span>
                            </Link>
                        ))}
                    </Speaker>
                </Flex>
                <Flex>
                    {tags.map(s => (
                        <Tag key={s.id} to={makeLink('category', s.name)}>
                            #{s.name.toLowerCase()}
                        </Tag>
                    ))}
                </Flex>
                {this.state.duration ? (
                    <Duration>{this.state.duration}</Duration>
                ) : null}
                {cinemaMode && description ? (
                    <Description>{description}</Description>
                ) : null}
            </span>
        )
    }
}

const VideoWrapper = props => (
    <CinemaMode
        render={(cinemaMode, showCinemaVideo, toggleCinemaMode) => (
            <SimpleVideo
                {...props}
                cinemaMode={cinemaMode}
                showCinemaVideo={showCinemaVideo}
                Player={Player}
                toggleCinemaMode={toggleCinemaMode}
            />
        )}
    />
)

export default ({ noLazy = false, talk }) => (
    <VideoWrapper key={talk.id} {...talk} />
)

import styled from 'styled-components'
import React, { Component } from 'react'
import Flex from 'styled-flex-component'
import { Link } from 'preact-router/match'

import LazyLoad from 'react-lazyload'
import remcalc from 'remcalc'

import Tag from './Styling/Tag'
import Player from './Player'
import CinemaMode from './CinemaMode'

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
  font-weight: 600;
  font-size: ${remcalc(18)};
  color: ${props => props.theme.black};
`

const Description = styled.p`
  opacity: 0.8;
  font-family: Montserrat-Light;
  font-size: ${remcalc(14)};
  color: ${props => props.theme.black};
  letter-spacing: ${remcalc(0.11)};
  line-height: ${remcalc(21)};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
  `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

export class SimpleVideo extends Component {
  state = { showVideo: false }

  showVideo = () => {
    this.setState(({ showVideo }) => ({
      showVideo: true
    }))
  }

  endVideo = id => {
    this.props.addWatched(id)
    this.setState(({ showVideo }) => ({
      showVideo: false
    }))
  }

  videoTitle = name => {
    if (name.length > 40) return `${name.substring(0, 40)}...`
    return name
  }

  render = (
    {
      speaker,
      description,
      link,
      name,
      tags,
      id,
      removeFavorite,
      addFavorite,
      removeWatched,
      addWatched,
      cinemaMode,
      showCinemaVideo
    },
    { showVideo }
  ) => {
    return (
      <span>
        <Player
          showVideo={showVideo || showCinemaVideo}
          cinemaMode={cinemaMode}
          id={id}
          onClick={this.showVideo}
          link={link}
          name={name}
          onEnd={() => this.endVideo(id)}
        />
        <Flex justifyBetween alignCenter>
          <Name title={name}>{this.videoTitle(name)}</Name>
          <Speaker>
            {speaker.map(s => (
              <Link
                key={s.id}
                activeClassName="active"
                href={makeLink('speaker', s.name)}
              >
                <span>{s.name}</span>
              </Link>
            ))}
          </Speaker>
        </Flex>
        <Flex>
          {tags.map(s => (
            <Tag
              key={s.id}
              activeClassName="active"
              href={makeLink('category', s.name)}
            >
              #{s.name.toLowerCase()}
            </Tag>
          ))}
        </Flex>
        {cinemaMode && description ? (
          <Description>{description}</Description>
        ) : null}
      </span>
    )
  }
}

const VideoWrapper = props => (
  <CinemaMode
    render={(cinemaMode, showCinemaVideo) => (
      <SimpleVideo
        {...props}
        cinemaMode={cinemaMode}
        showCinemaVideo={showCinemaVideo}
      />
    )}
  />
)

export default ({ noLazy = false, talk }) =>
  noLazy ? (
    <VideoWrapper {...talk} />
  ) : (
    <LazyLoad height={310}>
      <VideoWrapper {...talk} />
    </LazyLoad>
  )

import React from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import is, { isNot } from 'styled-is'
import remcalc from 'remcalc'

import Favorite from './Favorite'
import Play from './Styling/Play'
import Watched from './Watched'

const Video = styled.div``

const VideoWrapper = styled.section`
    position: relative;
    margin: auto;

    ${isNot('cinemaMode')`
    &:before {
      display: block;
      content: '';
      width: 100%;
      padding-top: 56.25%;
    }

    ${Video} {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
  `};
`

const Iframe = styled(YouTube)`
    position: relative;
    z-index: 3;
    border: none;
    transition: all 200ms ease;
    box-shadow: ${props => props.theme.shadow};
    height: 100%;

    ${is('cinemaMode')`
    height: ${remcalc(600)};
    @media (max-width: ${remcalc(768)}) {
      height: auto;
    }
  `};
`

const Thumbnail = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`

const Image = styled.div`
    position: relative;
    margin: auto;
    height: 100%;
    overflow: hidden;
    box-shadow: ${props => props.theme.shadow};

    ${is('cinemaMode')`
    height: auto;
  `};
`

export default ({ cinemaMode, id, link, showVideo, name, onClick, onEnd }) => (
  <VideoWrapper key={id} cinemaMode={cinemaMode}>
    <Video cinemaMode={cinemaMode}>
      {showVideo || cinemaMode ? (
        <Iframe
          videoId={link}
          id={`a-${link} do-not-delete-this-hack`}
          onReady={e => e.target.playVideo()}
          onEnd={onEnd}
          cinemaMode={cinemaMode}
          opts={{
            width: '100%'
          }}
        />
      ) : (
        <Image cinemaMode={cinemaMode}>
          <Play onClick={onClick} aria-label="Play Video" />
          <Thumbnail
            cinemaMode={cinemaMode}
            src={`https://img.youtube.com/vi/${link}/mqdefault.jpg`}
            alt={name}
          />
        </Image>
      )}
      <Favorite id={id} />
      <Watched id={id} />
    </Video>
  </VideoWrapper>
)

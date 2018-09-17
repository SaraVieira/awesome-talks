import React from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import is, { isNot } from 'styled-is'
import remcalc from 'remcalc'
import Card from 'card-vibes'

import Favorite from '../Favorite'
import Play from '../Styling/Play'
import Watched from '../Watched'

const Video = styled.div``

const VideoWrapper = styled.section`
    width: 100%;
    height: 100%;
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
    max-width: 100%;
    cursor: pointer;
    ${isNot('videoPage')`
        // this hides the black bar on the thumbnail
        margin-top: -37px;
    `};
`

const Image = styled.div`
    position: relative;
    margin: auto;
    height: 100%;
    min-height: 100px;
    min-width: 200px;
    overflow: hidden;
    box-shadow: ${props => props.theme.shadow};
    ${is('cinemaMode')`
    height: auto;
  `};
`
const Player = ({
    cinemaMode,
    id,
    link,
    showVideo,
    name,
    onClick,
    onEnd,
    toggleCinemaMode,
    hq,
    videoPage
}) => (
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
                        width: '100%',
                        host: 'https://www.youtube-nocookie.com',
                        playerVars: { rel: 0, showinfo: 0 }
                    }}
                />
            ) : (
                <Image cinemaMode={cinemaMode}>
                    <Play
                        big={videoPage}
                        onClick={onClick}
                        aria-label="Play Video"
                    />
                    <Thumbnail
                        videoPage={videoPage}
                        onClick={hq ? onClick : toggleCinemaMode}
                        cinemaMode={cinemaMode}
                        src={`https://img.youtube.com/vi/${link}/${
                            hq ? 'maxresdefault' : 'hqdefault'
                        }.jpg`}
                        alt={name}
                    />
                </Image>
            )}
            <Favorite big={videoPage} id={id} />
            <Watched big={videoPage} id={id} />
        </Video>
    </VideoWrapper>
)

export default props =>
    props.cinemaMode || props.videoMode ? (
        <Player {...props} />
    ) : (
        <Card style={{ padding: 0 }}>
            <Player {...props} />
        </Card>
    )

import styled from 'styled-components'
import YouTube from 'react-youtube'
import is, { isNot } from 'styled-is'
import remcalc from 'remcalc'

import Favorite from './Favorite'
import Play from './Styling/Play'
import Watched from './Watched'

const Video = styled.section`
  position: relative;
  margin: auto;

  ${isNot('cinemaMode')`
    height: ${remcalc(200)};
  `};
`

const Iframe = styled(YouTube)`
  position: relative;
  z-index: 3;
  border: none;
  transition: all 200ms ease;
  box-shadow: 0 ${remcalc(10)} ${remcalc(20)} rgba(0, 0, 0, 0.1),
    0 ${remcalc(6)} ${remcalc(6)} rgba(0, 0, 0, 0.12);
  height: ${remcalc(200)};

  ${is('cinemaMode')`
        height: ${remcalc(600)};
  `};

  @media (max-width: ${remcalc(768)}) {
    height: auto;
  }
`

const Thumbnail = styled.img`
  box-shadow: 0 ${remcalc(10)} ${remcalc(20)} rgba(0, 0, 0, 0.1),
    0 ${remcalc(6)} ${remcalc(6)} rgba(0, 0, 0, 0.12);
  display: block;
  width: 100%;
  height: ${remcalc(200)};
`

const Image = styled.div`
  position: relative;
  margin: auto;
  height: ${remcalc(200)};
  overflow: hidden;

  @media (max-width: ${remcalc(768)}) {
    height: auto;
  }

  ${is('cinemaMode')`
    height: auto;
  `};
`

export default ({ cinemaMode, id, link, showVideo, name, onClick, onEnd }) => (
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
)

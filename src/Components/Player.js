import styled from 'styled-components'
import YouTube from 'react-youtube'
import is from 'styled-is'

import Favorite from './Favorite'
import Watched from './Watched'

const Video = styled.section`
  position: relative;
  margin: auto;
`

const Iframe = styled(YouTube)`
  position: relative;
  z-index: 3;
  border: none;
  transition: all 200ms ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    height: auto;
  }
`

const Thumbnail = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);
  display: block;
  width: 100%;
`

const Image = styled.div`
  position: relative;
  margin: auto;
  height: 200px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
  }

  ${is('cinemaMode')`
    height: auto;
  `};
`

const Play = styled.button`
  background: #282828;
  border-radius: 50% / 10%;
  color: #ffffff;
  font-size: 1em;
  height: 3em;
  padding: 0;
  text-align: center;
  text-indent: 0.1em;
  transition: all 150ms ease-out;
  width: 4em;
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: none;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    background: #ff0000;
  }

  &:before {
    background: inherit;
    border-radius: 5% / 50%;
    bottom: 9%;
    content: '';
    left: -5%;
    position: absolute;
    right: -5%;
    top: 9%;
  }

  &:after {
    border-style: solid;
    border-width: 1em 0 1em 1.732em;
    border-color: transparent transparent transparent rgba(255, 255, 255, 0.75);
    content: ' ';
    font-size: 0.75em;
    height: 0;
    margin: -1em 0 0 -0.75em;
    top: 50%;
    position: absolute;
    width: 0;
  }
`

export default ({ cinemaMode, id, link, showVideo, name, onClick, onEnd }) => (
  <Video>
    {showVideo || cinemaMode ? (
      <Iframe
        videoId={link}
        id="iframe"
        onReady={e => e.target.playVideo()}
        onEnd={onEnd}
        opts={{
          width: '100%',
          height: cinemaMode ? 600 : 200
        }}
      />
    ) : (
      <Image cinemaMode={cinemaMode}>
        <Play onClick={onClick} />
        <Thumbnail
          cinemaMode={cinemaMode}
          src={`https://img.youtube.com/vi/${link}/mqdefault.jpg`}
          alt={name}
        />
        <Favorite id={id} />
        <Watched id={id} />
      </Image>
    )}
  </Video>
)

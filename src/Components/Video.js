import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'
import { Component } from 'preact'
import { Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Link } from 'preact-router/match'
import Portal from 'preact-portal'
import LazyLoad from 'react-lazyload'
import Player from './Player'

const Button = styled.button`
  background: transparent;
  display: block;
  border: none;
  color: #d62d22;
  font-weight: bold;
  text-align: right;
  padding: 0;
`

const Speaker = styled.p`
  padding-left: 20px;
  a {
    min-width: 30px;
    display: block;
    padding: 5px;
    text-align: center;

    &:after {
      left: 0;
    }
  }
`

const Tag = styled(Link)`
  opacity: 1;
  border: none;
  opacity: 0.8;
  font-weight: 600;
  color: #000000;
  margin-top: -20px;
  padding: 0;
  margin-bottom: 10px;
  margin-right: 10px;

  &:hover {
    opacity: 1;
    color: #000000;
  }
  &:after {
    display: none;
  }
`

const Name = styled.h2`
  font-size: 400;
  font-size: 22px;
  color: #000000;
  letter-spacing: -0.63px;
`

const Description = styled.p`
  opacity: 0.8;
  font-family: Montserrat-Light;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.11px;
  line-height: 21px;
`

const Column = styled(Col)`
  transition: all 200ms ease;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 40px;

  ${is('cinemaMode')`
    position: fixed;
    z-index: 9999;
    top: 10%;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 20px;
    max-height: 90%;
    overflow: scroll;
    padding-bottom: 50px;
  `};
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

injectGlobal`
  body.cinema-mode {
      overflow: hidden;
  }
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
  `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

export default class extends Component {
  state = { cinemaMode: false, showVideo: false }

  toggleCinemaMode = () => {
    this.setState(({ cinemaMode }) => ({
      cinemaMode: !cinemaMode
    }))
    document.body.classList.toggle('cinema-mode', this.state.cinemaMode)
  }

  showVideo = () => {
    this.setState(({ showVideo }) => ({
      showVideo: true
    }))
  }

  closeVideo = () => {
    this.setState(({ showVideo }) => ({
      showVideo: false
    }))
  }

  endVideo = id => {
    this.props.addWatched(id)
    this.setState(({ showVideo }) => ({
      showVideo: false
    }))
  }

  videoTitle = name => {
    if (name.length > 100) return `${name.substring(0, 100)}...`
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
      addWatched
    },
    { cinemaMode, showVideo }
  ) => (
    <LazyLoad height={310}>
      <Column
        cinemaMode={cinemaMode}
        md={cinemaMode ? 12 : 4}
        sm={cinemaMode ? 12 : 6}
        xs={9}
      >
        <Player
          showVideo={showVideo}
          cinemaMode={cinemaMode}
          id={id}
          onClick={this.showVideo}
          link={link}
          name={name}
          onEnd={() => this.endVideo(id)}
          closeVideo={this.closeVideo}
        />
        <Flex justifyBetween alignCenter>
          <Name>{this.videoTitle(name)}</Name>
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

        <Button name="Toggle Cinema Mode" onClick={this.toggleCinemaMode}>
          {cinemaMode ? 'Turn Off' : 'Turn On'} Cinema Mode
        </Button>

        {cinemaMode && description ? (
          <Description>{description}</Description>
        ) : null}

        {cinemaMode ? (
          <Portal into="body">
            <Overlay onClick={this.toggleCinemaMode} />
          </Portal>
        ) : null}
      </Column>
    </LazyLoad>
  )
}

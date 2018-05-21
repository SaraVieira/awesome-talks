import styled from 'styled-components'
import { Component } from 'preact'
import { Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Link } from 'preact-router/match'
import YouTube from 'react-youtube'
import is from 'styled-is'

const Button = styled.button`
  background: transparent;
  display: block;
  border: none;
  color: #f61c0d;
  font-weight: bold;
  text-align: right;
  padding: 0;
`

const Video = styled.section`
  position: relative;
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

const Name = styled.h2`
  font-size: 400;
  font-size: 22px;
  color: #000000;
  letter-spacing: -0.63px;
`

const Description = styled.p`
  opacity: 0.6;
  font-family: Montserrat-Light;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.11px;
  line-height: 21px;
`

const Column = styled(Col)`
  transition: all 200ms ease;
  margin-bottom: 20px;
`
const Iframe = styled(YouTube)`
  position: relative;
  z-index: 3;
  border: none;
  transition: all 200ms ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);
`

const Thumbnail = styled.img`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);
  display: block;
  width: 100%;
  height: 180px;

  ${is('isDescriptionClicked')`
    height: 500px;
  `};
`

const Image = styled.div`
  position: relative;
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
  position: absolute;
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

const makeLink = (name = 'FIX ME') =>
  `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

export default class extends Component {
  state = { isDescriptionClicked: false, showVideo: false }

  toggleDescription = () =>
    this.setState(({ isDescriptionClicked }) => ({
      isDescriptionClicked: !isDescriptionClicked
    }))

  showVideo = () => {
    this.setState(({ showVideo }) => ({
      showVideo: !showVideo
    }))
    setTimeout(() => document.getElementById('iframe').playVideo(), 200)
  }

  render = (
    { speaker, description, link, name },
    { isDescriptionClicked, showVideo }
  ) => (
    <Column
      md={isDescriptionClicked ? 12 : 4}
      xs={isDescriptionClicked ? 12 : 6}
    >
      <Video>
        {showVideo ? (
          <Iframe
            videoId={link}
            id="iframe"
            onReady={e => e.target.playVideo()}
            opts={{
              width: '100%',
              height: isDescriptionClicked ? '500' : 180
            }}
          />
        ) : (
          <Image>
            <Play onClick={this.showVideo} />
            <Thumbnail
              isDescriptionClicked={isDescriptionClicked}
              src={`https://img.youtube.com/vi/${link}/maxresdefault.jpg`}
              alt={name}
            />
          </Image>
        )}
      </Video>

      <Flex justifyBetween alignCenter>
        <Name>{name}</Name>
        <Speaker>
          {speaker.map(s => (
            <Link
              key={s.id}
              activeClassName="active"
              href={makeLink(speaker.name)}
            >
              <span>{s.name}</span>
            </Link>
          ))}
        </Speaker>
      </Flex>
      {description ? (
        <Button onClick={this.toggleDescription}>
          {isDescriptionClicked ? 'Hide' : 'Show'} Description
        </Button>
      ) : null}

      {isDescriptionClicked && description ? (
        <Description>{description}</Description>
      ) : null}
    </Column>
  )
}

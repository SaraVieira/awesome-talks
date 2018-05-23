import styled from 'styled-components'
import { Component } from 'preact'
import { Col } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import { Link } from 'preact-router/match'
import Player from './Player'

const Button = styled.button`
  background: transparent;
  display: block;
  border: none;
  color: #f61c0d;
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
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
  `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

export default class extends Component {
  state = { cinemaMode: false, showVideo: false }

  toggleDescription = () =>
    this.setState(({ cinemaMode }) => ({
      cinemaMode: !cinemaMode
    }))

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
    <Column md={cinemaMode ? 12 : 4} sm={cinemaMode ? 12 : 6} xs={9}>
      <Player
        cinemaMode={cinemaMode}
        id={id}
        showVideo={showVideo}
        onClick={this.showVideo}
        link={link}
        name={name}
        onEnd={() => this.endVideo(id)}
      />
      <Flex justifyBetween alignCenter>
        <Name>{name}</Name>
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

      {description ? (
        <Button onClick={this.toggleDescription}>
          {cinemaMode ? 'Hide' : 'Show'} Description
        </Button>
      ) : null}

      {cinemaMode && description ? (
        <Description>{description}</Description>
      ) : null}
    </Column>
  )
}

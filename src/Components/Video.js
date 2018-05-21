import styled from 'styled-components'
import { Component } from 'preact'
import { Col } from 'react-styled-flexboxgrid'
import { Mutation } from 'react-apollo'
import Flex from 'styled-flex-component'
import { Link } from 'preact-router/match'
import YouTube from 'react-youtube'
import is from 'styled-is'
import ADD_FAVORITE from '../Queries/ADD_FAVORITE'
import REMOVE_FAVORITE from '../Queries/REMOVE_FAVORITE'
import GET_FAVORITES from '../Queries/GET_FAVORITES'
import Query from './Query'

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
  margin: auto;
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

  ${is('isDescriptionClicked')`
    height: 500px;
  `};
`

const Image = styled.div`
  position: relative;
  margin: auto;
  height: 200px;
  overflow: hidden;
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
const Heart = styled.div`
  input[type='checkbox'] {
    clear: both;
    display: none;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label {
    z-index: 100;
    overflow: hidden;
    height: 6em;
    width: 6em;
    display: block;
    text-align: center;
    line-height: 95px;
    cursor: pointer;
    transition: all 300ms ease;
    border-radius: 50%;
    background-color: #fff;
  }

  input[type='checkbox'] + label:before {
    content: '';
    z-index: -1;
    position: absolute;
    background: rgb(220, 72, 127);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    transform: scale(0);
  }

  input[type='checkbox'] + label:after {
    content: '';
    z-index: -1;
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    transform: scale(0);
  }

  input[type='checkbox']:checked + label svg {
    transition: all 300ms ease-in-out;
    fill: rgb(220, 72, 127);
    transform: scale(1.3);
  }

  input[type='checkbox']:checked + label:after {
    animation: like-a 0.3s 0.2s forwards;
  }

  input[type='checkbox']:checked + label:before {
    animation: like-a 0.5s 0s forwards;
  }

  label svg {
    display: inline-flex;
    vertical-align: middle;
    width: 35px;
    fill: rgb(167, 167, 167);
  }
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
  `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

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
    { speaker, description, link, name, tags, id },
    { isDescriptionClicked, showVideo }
  ) => (
    <Column
      md={isDescriptionClicked ? 12 : 4}
      sm={isDescriptionClicked ? 12 : 6}
      xs={9}
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
              src={`https://img.youtube.com/vi/${link}/mqdefault.jpg`}
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
          {isDescriptionClicked ? 'Hide' : 'Show'} Description
        </Button>
      ) : null}

      <Query query={GET_FAVORITES}>
        {({ data: { favorites } }) => {
          return (
            <Mutation mutation={REMOVE_FAVORITE}>
              {removeFavorite => {
                return (
                  <Mutation mutation={ADD_FAVORITE}>
                    {addFavorite => {
                      return (
                        <Heart>
                          <input
                            checked={favorites.includes(id)}
                            type="checkbox"
                            id="like"
                            onClick={() =>
                              favorites.includes(id)
                                ? removeFavorite({ variables: { id } })
                                : addFavorite({
                                    variables: { id }
                                  })
                            }
                          />
                          <label htmlFor="like">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
                            </svg>
                          </label>
                        </Heart>
                      )
                    }}
                  </Mutation>
                )
              }}
            </Mutation>
          )
        }}
      </Query>

      {isDescriptionClicked && description ? (
        <Description>{description}</Description>
      ) : null}
    </Column>
  )
}

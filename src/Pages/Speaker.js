import React from 'react'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Helmet } from 'react-helmet'

import Query from './../Components/Query'
import Video from './../Components/Video'
import SPEAKER_VIDEOS from '../Queries/SPEAKER_VIDEOS'
import TwitterIcon from '../assets/twitter.svg'
import humanize, { urlify } from '../Utils/strings'
// import Nav from './Components/Nav'

const Wrapper = styled(Row)`
  margin-bottom: ${remcalc(30)};

  * {
    box-sizing: border-box;
  }

  @media (max-width: ${remcalc(768)}) {
    justify-content: center;
  }
`

const Img = styled.img`
  margin-right: ${remcalc(20)};
  box-shadow: ${props => props.theme.shadow};
  width: ${remcalc(200)};
  min-width: ${remcalc(200)};

  @media (max-width: ${remcalc(768)}) {
    margin: auto;
  }
`

const Desc = styled(Flex)`
  @media (max-width: ${remcalc(768)}) {
    flex-direction: column;

    h1 {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
`

const Section = styled.div`
  width: 100%;

  p {
    word-break: break-word;
  }

  @media (max-width: ${remcalc(768)}) {
    max-width: 80%;
    margin: auto;

    p {
      word-break: break-word;
      text-align: center;
    }
  }
`

const SpeakerInfo = ({ photo, name, bio, twitter }) => (
  <Wrapper>
    <Helmet>
      <title>Awesome Talks - {name}</title>
      <meta name="twitter:title" content={`Awesome Talks - ${name}`} />
      <meta name="twitter:image" content={photo.url} />
      <meta name="twitter:image:alt" content={name} />
      <meta name="description" content={`Amazing Tech Talks by ${name}`} />
      <meta
        name="twitter:description"
        content={`Amazing Tech Talks by ${name}`}
      />
    </Helmet>
    <Desc>
      {photo ? (
        <Img src={photo.url} alt={name} height="200" width="200" />
      ) : null}
      <Section>
        <Header title={humanize(name)} noSearch small />
        <p dangerouslySetInnerHTML={{ __html: urlify(bio) }} />{' '}
        <Flex justifyBetween alignCenter>
          {twitter ? (
            <a
              className="no-hover"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/${twitter}`}
            >
              <img src={TwitterIcon} alt="Twitter" width="24" />
            </a>
          ) : null}
          <a
            className="no-hover"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/SaraVieira/awesome-talks/issues/new?title=Wrong%20Speaker%20info%20for%20${name}&body=Hey!%20The%20info%20on%20${name}%20is%20wrong,%20what%20is%20wrong%20is`}
          >
            Wrong Info?
          </a>
        </Flex>
      </Section>
    </Desc>
  </Wrapper>
)

export default ({ speaker }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <Query query={SPEAKER_VIDEOS} variables={{ name: humanize(speaker) }}>
          {({ data: { allSpeakerses } }) => {
            return (
              <Section>
                <SpeakerInfo {...allSpeakerses[0]} />
                <Row>
                  <Header title="Talks" noSearch />
                </Row>
                <Row>
                  {allSpeakerses.length &&
                    allSpeakerses[0].videoses.map(v => (
                      <Video key={v.id} talk={v} />
                    ))}
                </Row>
              </Section>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

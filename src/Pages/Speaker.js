import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import remcalc from 'remcalc'

import Query from './../Components/Query'
import Video from './../Components/Video'
import SPEAKER_VIDEOS from '../Queries/SPEAKER_VIDEOS'
import TwitterIcon from '../assets/twitter.svg'
import humanize from '../Utils/strings'

const Wrapper = styled(Row)`
  margin-bottom: ${remcalc(30)};

  * {
    box-sizing: border-box;
  }
`

const Img = styled.img`
  margin-right: ${remcalc(20)};
  box-shadow: 0 ${remcalc(10)} ${remcalc(20)} rgba(0, 0, 0, 0.1),
    0 ${remcalc(6)} ${remcalc(6)} rgba(0, 0, 0, 0.12);
  width: ${remcalc(200)};
  min-width: ${remcalc(200)};

  @media (max-width: ${remcalc(768)}) {
    margin: auto;
  }
`

const Desc = styled(Flex)`
  @media (max-width: ${remcalc(768)}) {
    flex-direction: column;
  }
`

const Section = styled.div`
  width: 100%;
  @media (max-width: ${remcalc(768)}) {
    max-width: 80%;
    margin: auto;
  }
`

const SpeakerInfo = ({ photo, name, bio, twitter }) => (
  <Wrapper>
    <Desc>
      {photo ? (
        <Img src={photo.url} alt={name} height="200" width="200" />
      ) : null}
      <Section>
        <Header title={humanize(name)} noSearch small />
        <p>{bio} </p>
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
                      <Video key={v.id} {...v} speaker={[allSpeakerses[0]]} />
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

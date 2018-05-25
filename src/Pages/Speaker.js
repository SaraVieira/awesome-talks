import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import Query from './../Components/Query'
import Video from './../Components/Video'
import SPEAKER_VIDEOS from '../Queries/SPEAKER_VIDEOS'
import TwitterIcon from '../assets/twitter.svg'

const humanize = str => {
  var frags = str.split('-')
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
  }
  return frags.join(' ')
}

const Wrapper = styled(Row)`
  margin-bottom: 30px;

  * {
    box-sizing: border-box;
  }
`

const Img = styled.img`
  margin-right: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);
  width: 200px;
  height: 200px;

  @media (max-width: 768px) {
    margin: auto;
  }
`

const Desc = styled(Flex)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Section = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    max-width: 80%;
    margin: auto;
  }
`

const SpeakerInfo = ({ photo, name, bio, twitter }) => (
  <Wrapper>
    <Desc>
      {photo ? <Img src={photo.url} alt={name} /> : null}
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
          {({ data: { allSpeakerses } }) => (
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
          )}
        </Query>
      </Col>
    </Row>
  </Grid>
)

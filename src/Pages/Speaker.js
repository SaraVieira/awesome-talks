import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
import Video from './../Components/Video'
import SPEAKER_VIDEOS from '../Queries/SPEAKER_VIDEOS'

const humanize = str => {
  var frags = str.split('-')
  for (let i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
  }
  return frags.join(' ')
}

export default ({ speaker }) => (
  <Grid>
    <Header title={`Talks by ${humanize(speaker)}`} noSearch />
    <Row>
      <Col xs={12}>
        <Query query={SPEAKER_VIDEOS} variables={{ name: humanize(speaker) }}>
          {({ loading, error, data: { allSpeakerses } }) => {
            if (loading) return <div>Loading...</div>
            if (error) return `Error!: ${error}`
            return (
              <Row>
                {allSpeakerses.length &&
                  allSpeakerses[0].videoses.map(v => (
                    <Video key={v.id} {...v} speaker={[allSpeakerses[0]]} />
                  ))}
              </Row>
            )
          }}
        </Query>
      </Col>
    </Row>
  </Grid>
)

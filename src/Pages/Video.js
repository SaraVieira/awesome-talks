import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './../Components/Header'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Helmet } from 'react-helmet'

import Query from './../Components/Query'
import humanize from '../Utils/strings'
import Nav from './../Components/Nav'
import styled from 'styled-components'
import Tag from '../Components/Styling/Tag'
import Player from '../Components/Player'
import { graphql, compose } from 'react-apollo'
import VIDEO_DATA from '../Queries/VIDEO_DATA'
import ADD_WATCHED from '../Queries/ADD_WATCHED'
import { getDuration } from '../Utils/youtube'
import Flex from 'styled-flex-component'
import Error404 from './../Components/Errors/Error404'

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

const Column = styled(Col)`
    transition: all 200ms ease;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: ${remcalc(40)};
`

const Description = styled.p`
    opacity: 0.8;
    font-family: Montserrat-Light;
    font-size: ${remcalc(14)};
    color: ${props => props.theme.main};
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
`

const Img = styled.img`
    margin-right: ${remcalc(20)};
    box-shadow: ${props => props.theme.shadow};
    width: ${remcalc(100)};
    min-width: ${remcalc(100)};

    @media (max-width: ${remcalc(768)}) {
        margin: auto;
    }
`

const Duration = styled.span`
    margin-bottom: ${remcalc(10)};
    display: block;
    margin-top: ${remcalc(-5)};
    opacity: 0.8;
    font-weight: 400;
    position: relative
    right: ${remcalc(10)};
    top: ${remcalc(15)};
    color: ${props => props.theme.main};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

const VideoInfo = ({ name, description, speaker, id, tags, duration }) => (
    <div>
        <Helmet>
            <title>Awesome Talks - {name}</title>
            <meta name="twitter:title" content={`Awesome Talks - ${name}`} />
            <meta name="twitter:image:alt" content={name} />
            <meta name="description" content={description} />
            <meta
                name="twitter:description"
                content={`Amazing Tech Talk - ${name}`}
            />
        </Helmet>
        <Flex justifyBetween>
            <Header title={name} noSearch small />
            {duration ? <Duration>{getDuration(duration)}</Duration> : null}
        </Flex>
        <Row>
            {tags.map(s => (
                <Tag key={s.id} to={makeLink('category', s.name)}>
                    #{s.name.toLowerCase()}
                </Tag>
            ))}
        </Row>
        <Row>
            <Description>{description}</Description>
        </Row>
        <Row>
            {speaker.map(s => (
                <div key={`${s.id}_${id}`}>
                    {s.photo ? (
                        <Img
                            src={s.photo.url}
                            alt={name}
                            height="100"
                            width="100"
                        />
                    ) : null}
                    <Link to={makeLink('speaker', s.name)} className="no-hover">
                        {s.name}
                    </Link>
                    {s.bio ? <Description>{s.bio}</Description> : null}
                </div>
            ))}
        </Row>
    </div>
)

class VideoComponent extends Component {
    state = { showVideo: false }

    endVideo = id => {
        if (id) this.props.addWatched(id)
        this.setState(({ showVideo }) => ({ showVideo: false }))
    }

    showVideo = () => this.setState(({ showVideo }) => ({ showVideo: true }))

    render() {
        const videoName = this.props.match.params.video
        return (
            <Grid>
                <div role="banner">
                    <Nav />
                </div>
                <main>
                    <Row>
                        <Col xs={12}>
                            <Query
                                query={VIDEO_DATA}
                                variables={{ name: humanize(videoName) }}
                            >
                                {({ data: { allVideoses } }) => {
                                    const { showVideo } = this.state

                                    if (!allVideoses.length) {
                                        return <Error404 />
                                    }

                                    return (
                                        <Section>
                                            <div>
                                                <Column md={8} sm={8} xs={9}>
                                                    <Player
                                                        showVideo={showVideo}
                                                        videoMode
                                                        id={allVideoses[0].id}
                                                        link={
                                                            allVideoses[0].link
                                                        }
                                                        name={
                                                            allVideoses[0].name
                                                        }
                                                        onClick={this.showVideo}
                                                        onEnd={() =>
                                                            this.endVideo(
                                                                allVideoses[0]
                                                                    .id
                                                            )
                                                        }
                                                    />
                                                </Column>
                                                <VideoInfo
                                                    {...allVideoses[0]}
                                                />
                                            </div>
                                        </Section>
                                    )
                                }}
                            </Query>
                        </Col>
                    </Row>
                </main>
            </Grid>
        )
    }
}

const VideoPage = compose(
    graphql(ADD_WATCHED, {
        props: ({ mutate }) => ({
            addWatched: id => mutate({ variables: { id } })
        })
    })
)(VideoComponent)

export default VideoPage

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
import is from 'styled-is'
import Flex from 'styled-flex-component'
import Tag from '../Components/Styling/Tag'
import Player from '../Components/Player'
import { graphql, compose } from 'react-apollo'
import VIDEO_DATA from '../Queries/VIDEO_DATA'
import ADD_WATCHED from '../Queries/ADD_WATCHED'

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

    ${is('cinemaMode')`
    position: fixed;
    z-index: 9999;
    top: 10%;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
    background: ${props => props.theme.primary};
    padding: ${remcalc(20)};
    max-height: 90%;
    overflow: scroll;
    padding-bottom: ${remcalc(50)};
    `};
`

const Description = styled.p`
    opacity: 0.8;
    font-family: Montserrat-Light;
    font-size: ${remcalc(14)};
    color: ${props => props.theme.main};
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
`

const Speaker = styled.h2`
    margin-bottom: 0;
    margin-top: ${remcalc(5)};
    a {
        display: block;
        text-align: left;
        padding-bottom: ${remcalc(4)};
        line-height: 1;
        border: 0;
        margin-top: ${remcalc(10)};
        font-size: ${remcalc(20)};
        color: ${props => props.theme.darkGrey};
        padding-left: 0;
        transition: color 200ms ease;
    }
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

const VideoInfo = ({ name, description, speaker, id, tags }) => (
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
        <Header title={name} noSearch small />
        <Speaker>
            {speaker.map(s => (
                <Link
                    key={`${s.id}_${id}`}
                    to={makeLink('speaker', s.name)}
                    className="no-hover"
                >
                    {s.name}
                </Link>
            ))}
        </Speaker>
        <Flex>
            {tags.map(s => (
                <Tag key={s.id} to={makeLink('category', s.name)}>
                    #{s.name.toLowerCase()}
                </Tag>
            ))}
        </Flex>
        <Description>{description}</Description>
    </div>
)

class VideoComponent extends Component {
    state = { showVideo: false }

    endVideo = id => {
        if (id) this.props.addWatched(id)
        this.setState(({ showVideo }) => ({ showVideo: false }))
    }

    render() {
        const video = this.props.match.params.video
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
                                variables={{ name: humanize(video) }}
                            >
                                {({ data: { video } }) => {
                                    return (
                                        <Section>
                                            <Column md={8} sm={8} xs={9}>
                                                <Player
                                                    showVideo={true}
                                                    id={video.id}
                                                    link={video.link}
                                                    name={video.name}
                                                    onEnd={() =>
                                                        this.endVideo(video.id)
                                                    }
                                                />
                                            </Column>
                                            <VideoInfo {...video} />
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

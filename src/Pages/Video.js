import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Header from './../Components/Header'
import { Row, Grid, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Helmet } from 'react-helmet'

import Query from './../Components/Query'
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

const Description = styled.p`
    font-weight: 400;
    font-size: ${remcalc(16)};
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
    font-weight: 400;
    color: ${props => props.theme.main};
`

const HeaderStyled = styled(Header)`
    margin-bottom: ${remcalc(20)};
`

const PlayerStyled = styled.main`
    max-width: ${remcalc(1216)};
    margin: auto;
    margin-bottom: ${remcalc(20)};
`

const makeLink = (url = 'speaker', name = 'FIX ME') =>
    `/${url}/${name.replace(/\s+/g, '-').toLowerCase()}`

const VideoInfo = ({ name, description, speaker, id, tags, duration }) => (
    <Fragment>
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
        <HeaderStyled medium title={name} noSearch noMargin />
        <Flex column style={{ marginBottom: remcalc(40) }}>
            {duration ? <Duration>{getDuration(duration)}</Duration> : null}
            <div>
                {tags.map(s => (
                    <Tag key={s.id} to={makeLink('category', s.name)}>
                        #{s.name.toLowerCase()}
                    </Tag>
                ))}
            </div>
            <Description>{description}</Description>
        </Flex>
        <Row>
            <Col xs={12}>
                {speaker.map(s => (
                    <Fragment key={`${s.id}_${id}`}>
                        {s.photo ? (
                            <Img
                                src={s.photo.url}
                                alt={name}
                                height="100"
                                width="100"
                            />
                        ) : null}
                        <Link
                            to={makeLink('speaker', s.name)}
                            className="no-hover"
                        >
                            {s.name}
                        </Link>
                        {s.bio ? <Description>{s.bio}</Description> : null}
                    </Fragment>
                ))}
            </Col>
        </Row>
    </Fragment>
)

class VideoComponent extends Component {
    state = { showVideo: false }

    endVideo = id => {
        if (id) this.props.addWatched(id)
        this.setState(({ showVideo }) => ({ showVideo: false }))
    }

    showVideo = () => this.setState(({ showVideo }) => ({ showVideo: true }))

    render() {
        const id = this.props.match.params.id
        return (
            <Fragment>
                <Grid>
                    <div role="banner">
                        <Nav />
                    </div>
                </Grid>
                <Query query={VIDEO_DATA} variables={{ id }}>
                    {({ data: { allVideoses } }) => {
                        const { showVideo } = this.state

                        if (!allVideoses.length) {
                            return <Error404 />
                        }

                        return (
                            <Fragment>
                                <PlayerStyled>
                                    <Player
                                        showVideo={showVideo}
                                        videoMode
                                        hq
                                        id={allVideoses[0].id}
                                        link={allVideoses[0].link}
                                        name={allVideoses[0].name}
                                        onClick={this.showVideo}
                                        onEnd={() =>
                                            this.endVideo(allVideoses[0].id)
                                        }
                                    />
                                </PlayerStyled>
                                <Grid>
                                    <Row>
                                        <Col xs={12}>
                                            <VideoInfo {...allVideoses[0]} />
                                        </Col>
                                    </Row>
                                </Grid>
                            </Fragment>
                        )
                    }}
                </Query>
            </Fragment>
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

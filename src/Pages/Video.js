import React, { Component, Fragment } from 'react'
import Header from './../Components/Header'
import { Row, Grid, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { graphql, compose } from 'react-apollo'

import Query from './../Components/Query'
import Nav from './../Components/Nav'
import VideoInfo from './../Components/VideoInfo'
import styled from 'styled-components'
import Player from '../Components/Player'
import VIDEO_DATA from '../Queries/VIDEO_DATA'
import ADD_WATCHED from '../Queries/Local/ADD_WATCHED'
import Error404 from './../Components/Errors/Error404'

const HeaderStyled = styled(Header)`
    margin-bottom: ${remcalc(20)};
`

const PlayerStyled = styled.main`
    max-width: ${remcalc(1216)};
    margin: auto;
    margin-bottom: ${remcalc(20)};
`

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
                                <Grid>
                                    <Row>
                                        <Col xs={12}>
                                            <HeaderStyled
                                                medium
                                                title={allVideoses[0].name}
                                                noSearch
                                            />
                                        </Col>
                                    </Row>
                                </Grid>

                                <PlayerStyled>
                                    <Player
                                        videoPage
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

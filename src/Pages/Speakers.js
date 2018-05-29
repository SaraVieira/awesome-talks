import React from 'react'
import { Col, Row, Grid } from 'react-styled-flexboxgrid'
import Flex from 'styled-flex-component'
import styled from 'styled-components'
import Header from './../Components/Header'
import Query from './../Components/Query'
import SPEAKERS from '../Queries/SPEAKERS'
import { Figure, Img, Caption, Name } from './../Components/Styling/Speaker'
import Nav from './../Components/Nav'
import { Helmet } from 'react-helmet'

const makeLink = name => `/speaker/${name.replace(/\s+/g, '-').toLowerCase()}`

const makeName = name => name.split(' ')

const Wrapper = styled(Flex)`
    @media (max-width: 685px) {
        justify-content: center;
    }
`

export default () => (
    <Grid>
        <Nav />
        <Helmet>
            <title>Awesome Talks - Speakers</title>
            <meta
                name="description"
                content="Amazing Tech Talks curated by the community ❤️"
            />
            <meta name="twitter:title" content="Awesome Talks - Speakers" />
            <meta
                name="twitter:description"
                content="Amazing Tech Talks curated by the community ❤️"
            />
            <meta
                name="twitter:image"
                content="https://file-iloqdynwox.now.sh/"
            />
            <meta name="twitter:image:alt" content="awesome talks" />
        </Helmet>
        <Header title="Speakers" noSearch />
        <Row>
            <Col xs={12}>
                <Query query={SPEAKERS}>
                    {({ data: { allSpeakerses } }) => {
                        return (
                            <Row>
                                <Wrapper wrap justifyBetween>
                                    {allSpeakerses.map(s => (
                                        <Figure key={s.id}>
                                            <Img
                                                src={(s.photo || {}).url}
                                                alt={s.name}
                                            />
                                            <Caption>
                                                <Name>
                                                    {makeName(s.name)[0]}{' '}
                                                    <span>
                                                        {makeName(s.name)
                                                            .slice(-1)
                                                            .join(' ')}
                                                    </span>
                                                </Name>
                                            </Caption>
                                            <a
                                                aria-label="go to spaker"
                                                className="no-hover"
                                                href={makeLink(s.name)}
                                            />
                                        </Figure>
                                    ))}
                                </Wrapper>
                            </Row>
                        )
                    }}
                </Query>
            </Col>
        </Row>
    </Grid>
)

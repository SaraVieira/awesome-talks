import React, { Component } from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import { Query, Mutation } from 'react-apollo'

import Logo from '../assets/logo.svg'
import AddTalk from './AddTalk'
import GET_FAVORITES from '../Queries/GET_FAVORITES'
import SWITCH_MODE, { GET_MODE } from '../Queries/SWITCH_MODE'
import DARK_MOON from '../assets/dark_moon.svg'
import LIGHT_MOON from '../assets/light_moon.svg'

import linkParser from '../Utils/link-parser'

const modeObject = {
    DARK: {
        src: LIGHT_MOON,
        alt: 'enable light mode',
        pressed: 'false'
    },
    LIGHT: {
        src: DARK_MOON,
        alt: 'enable dark mode',
        pressed: 'true'
    }
}

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${remcalc(40)} 0;

    @media (max-width: ${remcalc(768)}) {
        flex-direction: column;
        padding: ${remcalc(40)} ${remcalc(20)};
    }
`

const List = styled.ul`
    display: flex;
    justify-content: flex-end;

    @media (max-width: ${remcalc(768)}) {
        justify-content: center;
        flex-wrap: wrap;
        line-height: ${remcalc(40)};
    }
`

const LogoWrapper = styled(Link)`
    opacity: 1;
    border: none;
    &:after {
        display: none;
    }
`

const Item = styled.li`
    @media (max-width: ${remcalc(768)}) {
        font-size: ${remcalc(16)};

        ${is('hideOnMobile')`
        display: none;
    `};
    }

    &:not(:last-child) {
        margin-right: ${remcalc(10)};
    }
`

const Img = styled.img`
    height: ${remcalc(30)};
    cursor: pointer;
`

export default class Navigation extends Component {
    state = {
        modalIsOpen: false,
        submitted: false,
        submitError: false
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    handleError = errorMsg => {
        this.setState({
            submitError: errorMsg
        })
        this.props.handleReset()
        setTimeout(() => {
            this.setState({
                submitError: false
            })
        }, 3000)
    }

    submit = async (e, createVideos, values, setSubmitting, handleReset) => {
        e.preventDefault()

        // attach it
        this.handleReset = handleReset

        if (values.name.trim() === '' || values.link.trim() === '') {
            this.handleError('You must fill in all of the fields')
            return false
        }

        const link = linkParser(values.link)

        if (link.length !== 11) {
            this.handleError(link)
            return false
        }

        // remove multiple spaces from name
        values.name = String(values.name)
            .replace(/\s{2,}/gu, ' ')
            .trim()

        const valuesToBeSaved = {
            ...values,
            link
        }

        try {
            await createVideos({ variables: { ...valuesToBeSaved } })
        } catch (err) {
            const msg = err.message.includes('A unique constraint')
                ? 'Awesome! We already have this. Thanks anyway.'
                : err.message

            this.handleError(msg)
            return false
        }

        setSubmitting(false)
        handleReset()
        this.setState({ submitted: true }, () => {
            setTimeout(() => {
                this.setState({
                    submitted: false
                })
            }, 3000)
        })
    }

    render = () => {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Nav>
                            <LogoWrapper to="/">
                                <img src={Logo} width="70" alt="Home" />
                            </LogoWrapper>
                            <List>
                                <Item>
                                    <Link to="/speakers">
                                        <span>Speakers</span>
                                    </Link>
                                </Item>
                                <Item>
                                    <Link to="/categories">
                                        <span>Categories</span>
                                    </Link>
                                </Item>
                                <Query query={GET_FAVORITES}>
                                    {({ data: { favorites } }) =>
                                        favorites.length ? (
                                            <Item>
                                                <Link to="/favorites">
                                                    <span>Favorites</span>
                                                </Link>
                                            </Item>
                                        ) : null
                                    }
                                </Query>
                                <Item hideOnMobile>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://github.com/SaraVieira/awesome-talks"
                                    >
                                        <span>GitHub</span>
                                    </a>
                                </Item>
                                <Item>
                                    <button
                                        className="active_nav link"
                                        onClick={this.openModal}
                                    >
                                        Add a Talk
                                    </button>

                                    <AddTalk
                                        modalIsOpen={this.state.modalIsOpen}
                                        close={this.closeModal}
                                        submit={this.submit}
                                        submitted={this.state.submitted}
                                        submitError={this.state.submitError}
                                    />
                                </Item>
                                <Item>
                                    <Mutation mutation={SWITCH_MODE}>
                                        {(switchMode, { data, loading }) => (
                                            <Query query={GET_MODE}>
                                                {({ data: { mode } }) => {
                                                    const {
                                                        src,
                                                        alt,
                                                        pressed
                                                    } = modeObject[mode]
                                                    return (
                                                        <Img
                                                            role="button"
                                                            aria-pressed={
                                                                pressed
                                                            }
                                                            title={alt}
                                                            onClick={switchMode}
                                                            src={src}
                                                            alt={alt}
                                                        />
                                                    )
                                                }}
                                            </Query>
                                        )}
                                    </Mutation>
                                </Item>
                            </List>
                        </Nav>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

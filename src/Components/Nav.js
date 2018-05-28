import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'
import { Link } from 'react-router-dom'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import Modal from 'react-modal'
import remcalc from 'remcalc'
import { withFormik } from 'formik'
import { Mutation, Query } from 'react-apollo'

import Logo from '../assets/logo.svg'
import Loading from '../assets/loading.svg'
import Button from './Styling/Button'
import Input from './Styling/Input'
import CREATE_VIDEO from '../Queries/ADD_VIDEO'
import GET_FAVORITES from '../Queries/GET_FAVORITES'

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

injectGlobal`
    .ReactModalPortal {
        z-index: 10;
        position: relative;
    }
    @media (max-width: ${remcalc(768)}) {
        .ReactModal__Content.ReactModal__Content--after-open {
            width: 80%;
            height: ${remcalc(300)};
            z-index: 999;
        }
    }
`

const Name = styled.h2`
  font-size: 400;
  font-size: ${remcalc(22)};
  color: ${props => props.theme.black};
  letter-spacing: ${remcalc(-0.63)};
`

const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${remcalc(20)};
`

class Navigation extends Component {
  state = {
    modalIsOpen: false,
    submitted: false
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  submit = async (e, createVideos, values, setSubmitting, handleReset) => {
    e.preventDefault()
    await createVideos({ variables: { ...values } })
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

  render = (
    { values, handleChange, handleBlur, setSubmitting, handleReset },
    { modalIsOpen, submitted }
  ) => (
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav>
            <LogoWrapper href="/">
              <img src={Logo} width="70" alt="Logo" />
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
                <a onClick={this.openModal}>
                  <span>Add a Talk</span>
                </a>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={this.closeModal}
                  contentLabel="Add a Talk"
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0,0,0,0.3)'
                    },
                    content: {
                      color: '#666',
                      border: 'none',
                      borderRadius: 0,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }
                  }}
                >
                  <Name> Add a Talk </Name>
                  <Mutation mutation={CREATE_VIDEO}>
                    {(createVideos, { data, loading }) => (
                      <form
                        onSubmit={e =>
                          this.submit(
                            e,
                            createVideos,
                            values,
                            setSubmitting,
                            handleReset
                          )
                        }
                      >
                        {submitted ? (
                          <Name>
                            You are the Best{' '}
                            <span role="img" aria-label="party">
                              🎉
                            </span>
                          </Name>
                        ) : null}
                        <Wrapper>
                          <Input
                            id="name"
                            placeholder="Enter the title of the talk"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <span />
                        </Wrapper>
                        <Wrapper>
                          <Input
                            id="link"
                            placeholder="Enter the Youtube Video ID"
                            type="text"
                            value={values.link}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          <span />
                        </Wrapper>
                        <Button
                          name="Add a Talks"
                          type="submit"
                          submitted={submitted}
                          disabled={false}
                        >
                          {loading ? <img src={Loading} alt="Loading" /> : null}
                          {!loading && !submitted ? 'Submit' : null}
                          {submitted ? (
                            <svg className="checkmark" viewBox="0 0 70 70">
                              <path d="m31.5,46.5l15.3,-23.2" />
                              <path d="m31.5,46.5l-8.5,-7.1" />
                            </svg>
                          ) : null}
                        </Button>
                      </form>
                    )}
                  </Mutation>
                </Modal>
              </Item>
            </List>
          </Nav>
        </Col>
      </Row>
    </Grid>
  )
}

export default withFormik({
  mapPropsToValues: () => ({ name: '', link: '' }),
  displayName: 'AddTalk'
})(Navigation)

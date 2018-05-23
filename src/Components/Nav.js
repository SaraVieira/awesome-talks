import { Component } from 'preact'
import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'
import { Link } from 'preact-router/match'
import Logo from '../assets/logo.svg'
import Loading from '../assets/loading.svg'
import { Grid, Row, Col } from 'react-styled-flexboxgrid'
import Modal from 'react-modal'
import { withFormik } from 'formik'
import { Mutation, Query } from 'react-apollo'
import CREATE_VIDEO from '../Queries/ADD_VIDEO'
import GET_FAVORITES from '../Queries/GET_FAVORITES'

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`

const List = styled.ul`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    line-height: 40px;
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
  @media (max-width: 768px) {
    font-size: 16px;

    ${is('hideOnMobile')`
        display: none;
    `};
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`

const Input = styled.input`
  font-size: 15px;
  color: #666;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
  border: 0;
  padding: 7px 0;
  border-bottom: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  & ~ span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #337294;
    transition: 0.4s;
  }
  &:focus ~ span {
    width: 100%;
    transition: 0.4s;
  }
`

const Button = styled.button`
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  margin-right: 0;
  margin-left: 0;
  line-height: 1;
  letter-spacing: 0.1em;
  text-align: center;
  text-shadow: none;
  vertical-align: middle;
  border-width: 0.125rem;
  border-style: solid;
  border-radius: 0.25rem;
  outline: 0;
  transition: background-color 150ms, border-color 150ms, color 75ms ease-out;
  padding-top: 0.8125rem;
  padding-bottom: 0.6875rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  min-width: 7.5rem;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: #fff;
  background-color: #60b7e6;
  border-color: transparent;
  min-width: 125px;

  img,
  svg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 2.5em;
    height: 2.5em;
    margin: auto !important;
    pointer-events: none;
    width: 2em;
    height: 2em;

    path {
      stroke: #fff;
      stroke-width: 5;
    }
  }
`

injectGlobal`
    .ReactModalPortal {
        z-index: 10;
        position: relative;
    }
    @media (max-width: 768px) {
        .ReactModal__Content.ReactModal__Content--after-open {
            width: 80%;
            height: 300px;
            z-index: 999;
        }
    }
`

const Name = styled.h2`
  font-size: 400;
  font-size: 22px;
  color: #000000;
  letter-spacing: -0.63px;
`

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
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
                <Link href="/speakers">
                  <span>Speakers</span>
                </Link>
              </Item>
              <Item>
                <Link href="/categories">
                  <span>Categories</span>
                </Link>
              </Item>
              <Query query={GET_FAVORITES}>
                {({ data: { favorites } }) =>
                  favorites.length ? (
                    <Item>
                      <Link href="/favorites">
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
                        {submitted ? <Name> You are the Best 🎉</Name> : null}
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
                          {loading ? <img src={Loading} /> : null}
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

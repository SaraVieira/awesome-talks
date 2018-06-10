import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'
import CinemaToggle from '../../Utils/toggle-button'

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

injectGlobal`
    body.cinema-mode {
        overflow: hidden;
    }
`

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`
const Text = styled.div`
    font-size: 15px;
    padding: 4px;
    padding-left: 5px;
    font-weight: 200;
    color: ${props => props.theme.main};
`
const Section = styled.div`
    display: flex;
`

export default class CinemaMode extends Component {
    state = {
        cinemaMode: false,
        showVideo: false
    }

    handleKeyDown = event => {
        if (
            event.keyCode === 27 &&
            document.body.classList.contains('cinema-mode')
        ) {
            this.toggleCinemaMode()
        }
    }

    toggleCinemaMode = () => {
        this.setState(
            ({ cinemaMode }) => ({
                cinemaMode: !cinemaMode,
                showVideo: !cinemaMode
            }),
            () => {
                document.body.classList.toggle(
                    'cinema-mode',
                    this.state.cinemaMode
                )

                if (this.state.cinemaMode === false) {
                    document.removeEventListener('keydown', this.handleKeyDown)
                } else {
                    document.addEventListener('keydown', this.handleKeyDown)
                }
            }
        )
    }
    render() {
        const { render } = this.props
        const { cinemaMode, showVideo } = this.state
        return (
            <Column
                cinemaMode={cinemaMode}
                md={cinemaMode ? 12 : 4}
                sm={cinemaMode ? 12 : 6}
                xs={9}
            >
                <div>
                    <CinemaToggle>
                        {render(cinemaMode, showVideo, this.toggleCinemaMode)}
                        <Section>
                            <input
                                className="tgl tgl-ios"
                                id="cinema"
                                type="checkbox"
                                aria-label="Toggle Cinema Mode"
                                name="Toggle Cinema Mode"
                                checked={cinemaMode}
                            />
                            <label
                                className="tgl-btn"
                                htmlFor="cinema"
                                onClick={this.toggleCinemaMode}
                            />
                            <Text>
                                {cinemaMode ? 'Turn Off' : 'Turn On'} Cinema
                                Mode
                            </Text>
                        </Section>
                    </CinemaToggle>
                    {cinemaMode
                        ? createPortal(
                              <Overlay onClick={this.toggleCinemaMode} />,
                              document.getElementsByTagName('body')[0]
                          )
                        : null}
                </div>
            </Column>
        )
    }
}

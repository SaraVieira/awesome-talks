import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'

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

const Button = styled.button`
    background: transparent;
    display: block;
    border: none;
    color: ${props => props.theme.cinema};
    font-weight: 600;
    text-align: right;
    padding: 6px 0px;
    cursor: pointer;
    text-transform: uppercase;
    transition: background 200ms ease;
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

    cinemaButton = () => {
        return (
            <Button name="Toggle Cinema Mode" onClick={this.toggleCinemaMode}>
                {this.state.cinemaMode ? 'Turn Off' : 'Turn On'} Cinema Mode
            </Button>
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
                    {render(cinemaMode, showVideo, this.toggleCinemaMode)}

                    {cinemaMode ? this.cinemaButton() : null}

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

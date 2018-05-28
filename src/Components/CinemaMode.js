import { Component } from 'preact'
import { Col } from 'react-styled-flexboxgrid'
import remcalc from 'remcalc'
import styled, { injectGlobal } from 'styled-components'
import is from 'styled-is'
import Portal from 'preact-portal'

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
  background: ${props => props.theme.white};
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
  color: #d62d22;
  font-weight: bold;
  text-align: right;
  padding: 0;
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
  toggleCinemaMode = () => {
    this.setState(({ cinemaMode }) => ({
      cinemaMode: !cinemaMode,
      showVideo: !cinemaMode
    }))
    document.body.classList.toggle('cinema-mode', this.state.cinemaMode)
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
        {render(cinemaMode, showVideo)}
        <Button name="Toggle Cinema Mode" onClick={this.toggleCinemaMode}>
          {cinemaMode ? 'Turn Off' : 'Turn On'} Cinema Mode
        </Button>

        {cinemaMode ? (
          <Portal into="body">
            <Overlay onClick={this.toggleCinemaMode} />
          </Portal>
        ) : null}
      </Column>
    )
  }
}

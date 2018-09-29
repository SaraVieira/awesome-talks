import remcalc from 'remcalc'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');
    @import url('https://fonts.googleapis.com/css?family=Space+Mono');
    body {
        margin: 0;
        padding: 0;
        font-family: Avenir, Montserrat, Arial, sans-serif;
        font-size: ${remcalc(14)};
        color: #666;
        letter-spacing: ${remcalc(0.11)};
        line-height: ${remcalc(21)};
        padding-bottom: ${remcalc(40)};
        background-color: ${props => props.theme.primary};
    }
    body.cinema-mode {
        overflow: hidden;
    }

    div[id*='do-not-delete-this-hack'] {
        display: none;
    }

    code {
        font-family: 'Space Mono', monospace;
    }

  button {
    font-family: Avenir, Montserrat, Arial, sans-serif;
  }

  nav a {
    padding: 7px 14px;
    border-bottom: ${remcalc(2)} solid ${props => props.theme.blue};
  }

  a,
  .link {
    border: none;
    color: ${props => props.theme.blue};
    text-decoration: none;
    position: relative;
    opacity: 0.8;
    font-weight: 300;
    letter-spacing: ${remcalc(0.09)};
    text-align: left;
    line-height: ${remcalc(21)};
    font-size: ${remcalc(14)};
    cursor: pointer;
    transition: color 200ms ease;

          &.no-hover {
              line-height: 1.8;
              &:hover {
                  color: ${props => props.theme.blue};
              }
              &:after {
                  display: none;
              }
          }

          span {
            position: relative;
            z-index: 10;
          }

    &.active_nav{
        color: #fff;
        height: ${remcalc(35)};
        top: ${remcalc(-6)};
        &:after {
            left: 0;
            z-index: -1;
        }
        &:hover{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.12), 0 2px 4px 0 rgba(0,0,0,.08);
        }
    }

    @media (pointer: coarse) {

        &.active_nav{
            top: ${remcalc(1)};;
            background: none;
            color: ${props => props.theme.blue};
        }
    }

    @media (pointer: fine) {

     &:after {
        transition: height 200ms ease;
        content: '';
        width: 100%;
        height: 0;
        background: ${props => props.theme.blue};
        display: block;
        position: absolute;
        bottom: 0;
        z-index: 0;
        border-radius: 2px 2px 0 0;
      }

      &.active_nav, &:hover  {
        color: ${props => props.theme.primary};

              &:after {
                height: 100%;
              }
            }
          }
        }

        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
`

export default GlobalStyle

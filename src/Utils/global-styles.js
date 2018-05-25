import { injectGlobal } from 'styled-components'
import remcalc from 'remcalc'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');
  body {
    margin: 0;
    padding: 0;
    font-family: Montserrat;
    font-size: ${remcalc(14)};
    color: #666;
    letter-spacing: ${remcalc(0.11)};
    line-height: ${remcalc(21)};
    padding-bottom: ${remcalc(40)};
  }

  div[id*='do-not-delete-this-hack'] {
    display: none;
  }

  a {
    color: #337294;
    text-decoration: none;
    padding-bottom: ${remcalc(2)};
    border-bottom: ${remcalc(2)} solid #337294;
    position: relative;
    padding: ${remcalc(5)};;
    opacity: 0.8;
    font-wheight: 300;
    letter-spacing: ${remcalc(0.09)};
    text-align: left;
    line-height: ${remcalc(21)};;
    cursor: pointer;
    transition: color 200ms ease;

    &.no-hover {
        &:after {
            display: none;
        }
    }

    span {
      position: relative;
      z-index: 10;
    }

    &:after {
      transition: height 200ms ease;
      content: '';
      width: 100%;
      height: 0;
      background: #337294;
      display: block;
      position: absolute;
      bottom: 0;
      z-index: 0;
    }

    &:hover {
      color: white;

      &:after {
        height: 100%;
      }
    }
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

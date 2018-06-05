import { injectGlobal } from 'styled-components'
import remcalc from 'remcalc'

injectGlobal`
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

  a,
  .link {
    border: none;
    color: #337294;
    text-decoration: none;
    padding-bottom: ${remcalc(2)};
    border-bottom: ${remcalc(2)} solid #337294;
    position: relative;
    padding: 7px 14px;
    opacity: 0.8;
    font-wheight: 300;
    letter-spacing: ${remcalc(0.09)};
    text-align: left;
    line-height: ${remcalc(21)};
    font-size: ${remcalc(14)};
    cursor: pointer;
    transition: color 200ms ease;

    &.no-hover {
        line-height: 1.8;
        &:hover {
            color: #255a77;
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
            background: #fff;
            color: #337294;
        }
    }

    @media (pointer: fine) {

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

      &.active_nav, &:hover {
        color: white;

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

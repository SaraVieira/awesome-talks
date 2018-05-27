import styled from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'

export default styled.div`
  position: absolute;
  z-index: 10;
  right: ${remcalc(10)};
  top: ${remcalc(10)};

  ${is('watched')`
      top: ${remcalc(50)};
  `};

  input[type='checkbox'] {
    clear: both;
    display: none;
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label {
    z-index: 100;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
  }

  input[type='checkbox'] + label:before {
    content: '';
    z-index: -1;
    position: absolute;
    background: rgb(214, 214, 214);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    transform: scale(0);
  }

  input[type='checkbox'] + label:after {
    content: '';
    z-index: -1;
    position: absolute;
    background: white;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    top: 0;
    left: 0;
    transform: scale(0);
  }

  input[type='checkbox']:checked + label svg {
    transition: all 300ms ease-in-out;
    fill: #ff0000;
    transform: scale(1.3);
  }

  input[type='checkbox']:checked + label svg g {
    fill: ${props => props.theme.green};
  }

  input[type='checkbox']:checked + label:after {
    animation: like-a 0.3s 0.2s both;
  }

  input[type='checkbox']:checked + label:before {
    animation: like-a 0.5s 0s both;
  }

  label svg,
  label g {
    display: inline-flex;
    vertical-align: middle;
    width: ${remcalc(35)};
    fill: rgb(214, 214, 214);
  }
`

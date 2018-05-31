import styled, { keyframes } from 'styled-components'
import remcalc from 'remcalc'

const Beat = keyframes`
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
`

export default styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) rotate(45deg);
    width: ${remcalc(64)};
    height: ${remcalc(64)};
    transform-origin: ${remcalc(32)} ${remcalc(32)};

    & div {
        top: ${remcalc(23)};
        left: ${remcalc(19)};
        position: absolute;
        width: ${remcalc(26)};
        height: ${remcalc(26)};
        background: #ff0000;
        animation: ${Beat} 1s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    & div:after,
    & div:before {
        content: ' ';
        position: absolute;
        display: block;
        width: ${remcalc(26)};
        height: ${remcalc(26)};
        background: #ff0000;
    }

    & div:before {
        left: ${remcalc(-17)};
        border-radius: 50% 0 0 50%;
    }

    & div:after {
        top: ${remcalc(-17)};
        border-radius: 50% 50% 0 0;
    }
`

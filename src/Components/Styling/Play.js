import styled from 'styled-components'
import is from 'styled-is'

export default styled.button`
    background: #282828;
    border-radius: 50% / 10%;
    color: ${props => props.theme.primary};
    font-size: 1em;
    height: 3em;
    padding: 0;
    text-align: center;
    text-indent: 0.1em;
    transition: all 150ms ease-out;
    width: 4em;
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border: none;
    opacity: 0.8;
    cursor: pointer;

    ${is('big')`
        transform: scale(2);
    `};

    &:hover {
        background: #ff0000;
    }

    &:before {
        background: inherit;
        border-radius: 5% / 50%;
        bottom: 9%;
        content: '';
        left: -5%;
        position: absolute;
        right: -5%;
        top: 9%;
    }

    &:after {
        border-style: solid;
        border-width: 1em 0 1em 1.732em;
        border-color: transparent transparent transparent
            rgba(255, 255, 255, 0.75);
        content: ' ';
        font-size: 0.75em;
        height: 0;
        margin: -1em 0 0 -0.75em;
        top: 50%;
        position: absolute;
        width: 0;
    }
`

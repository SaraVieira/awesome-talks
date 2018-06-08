import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled.button`
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
    transition: background-color 150ms, border-color 150ms, color 75ms ease-out;
    padding-top: 0.8125rem;
    padding-bottom: 0.6875rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    min-width: 7.5rem;
    padding-right: 1.25rem;
    padding-left: 1.25rem;
    font-size: 0.75rem;
    color: ${props => props.theme.primary};
    background-color: #60b7e6;
    border-color: transparent;
    min-width: ${remcalc(125)};

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
            stroke: ${props => props.theme.primary};
            stroke-width: 5;
        }
    }
`

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled(Link)`
    background-color: ${props => props.theme.primary};
    border: ${remcalc(1)} solid ${props => props.theme.blue};
    padding: ${remcalc(6)} ${remcalc(15)};
    color: ${props => props.theme.main};
    border-radius: ${remcalc(5)};
    font-family: 'Space Mono', monospace;
    font-size: ${remcalc(36)};
    line-height: 1.2;
    transition: all 300ms ease-in-out;
    text-decoration: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    .count {
        font-family: Avenir, Montserrat, Arial, sans-serif;
        font-size: 14px;
        color: ${props => props.theme.darkGrey};
        opacity: 0.7;
        margin-top: ${remcalc(-15)};
    }

    &:hover {
        color: ${props => props.theme.primary};
    }
`

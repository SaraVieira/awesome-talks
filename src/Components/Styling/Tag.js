import styled from 'styled-components'
import { Link } from 'react-router-dom'
import remcalc from 'remcalc'

export default styled(Link)`
    font-family: 'Space Mono', monospace;
    border: none;
    color: ${props => props.theme.black};
    margin-top: ${remcalc(-10)};
    padding: 0;
    margin-bottom: ${remcalc(10)};
    margin-right: ${remcalc(10)};

    &:hover {
        opacity: 1;
        color: ${props => props.theme.main};
        backgground: transparent;
    }
    &:after {
        display: none;
    }
`

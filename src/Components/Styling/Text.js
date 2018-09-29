import styled from 'styled-components'
import remcalc from 'remcalc'
import is from 'styled-is'

export const Name = styled.h4`
    font-weight: 700;
    font-size: ${remcalc(20)};
    color: ${props => props.theme.main};
    line-height: 1 !important;
    margin: 0;
    margin-right: ${remcalc(10)};
    padding-left: 0;
    word-break: break-all;
    border: 0;
    display: block;

    @media (max-width: ${remcalc(768)}) {
        width: 100%;
        margin: ${remcalc(10)} 0;
    }
`

export const Title = styled(Name)`
    margin: ${remcalc(20)} 0;
    font-size: ${remcalc(30)};
`

export const Button = styled.button`
    height: ${remcalc(35)};
    border: 2px solid #5e8eaa;
    background: white;
    color: black;
    opacity: 0.8;
    font-size: 16px;
    font-weight: bold;
    transition: all 200ms ease;
    cursor: pointer;

    ${is('selected')`
        color: white;
        background: #5e8eaa;
    `};
`

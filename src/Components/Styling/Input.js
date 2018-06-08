import styled from 'styled-components'
import remcalc from 'remcalc'

/* not supposed to change on theme change */
export default styled.input`
    font-size: ${remcalc(15)};
    color: #666;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: ${remcalc(1)};
    border: 0;
    padding: ${remcalc(7)} 0;
    border-bottom: ${remcalc(1)} solid #ccc;

    &:focus {
        outline: none;
    }

    & ~ span {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: ${remcalc(2)};
        background-color: #337294;
        transition: 0.4s;
    }
    &:focus ~ span {
        width: 100%;
        transition: 0.4s;
    }
`

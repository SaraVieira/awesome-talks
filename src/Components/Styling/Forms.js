import styled from 'styled-components'
import remcalc from 'remcalc'

export const Select = styled.select`
    height: ${remcalc(35)};
    border: 2px solid #5e8eaa;
    color: black;
    opacity: 0.8;
    width: ${remcalc(190)};
    font-size: 16px;
    font-weight: bold;
`

export const Checkbox = styled.div`
    user-select: none;
    position: relative;
    width: ${remcalc(40)};
    margin-left: ${remcalc(-17)};
    margin-right: ${remcalc(20)};

    input[type='checkbox'] {
        opacity: 0;
    }

    label {
        position: relative;
    }
    label::before,
    label::after {
        position: absolute;
    }
    /*Outer-box*/
    label::before {
        top: ${remcalc(11)};
    }
    /*Checkmark*/
    label::after {
        left: ${remcalc(4)};
        top: ${remcalc(15)};
    }

    /*Hide the checkmark by default*/
    input[type='checkbox'] + label::after {
        content: none;
    }

    input[type='checkbox']:focus + label::before {
        outline: rgb(59, 153, 252) auto 5px;
    }
    /*Unhide the checkmark on the checked state*/
    input[type='checkbox']:checked + label::after {
        content: '';
    }

    label::before {
        content: '';
        display: inline-block;

        height: ${remcalc(16)};
        width: ${remcalc(16)};

        border: ${remcalc(1)} solid;
    }

    label::after {
        content: '';
        display: inline-block;
        height: ${remcalc(6)};
        width: ${remcalc(9)};
        border-left: ${remcalc(2)} solid #5e8eaa;
        border-bottom: ${remcalc(2)} solid #5e8eaa;

        transform: rotate(-45deg);
    }
`

import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Section } from '../Styling/Section'

const Input = styled.input`
    display: none;

    &:checked + label {
        background-color: ${props => props.theme.green};
    }

    &:checked + label > i {
        margin-left: ${remcalc(24)};
    }

    &:checked + label:active > i {
        margin-left: ${remcalc(18)};
    }
`

const Label = styled.label`
    display: block;
    width: ${remcalc(54)};
    height: ${remcalc(32)};
    margin: 0 auto;
    border-radius: ${remcalc(100)};
    transition: all 0.2s ease-in-out;
    background-color: ${props => props.theme.lightGrey};

    &:after {
        display: inline-block;
        content: 'Hide Watched Talks';
        position: relative;
        width: ${remcalc(150)};
        left: ${remcalc(60)};
        top: ${remcalc(-30)};
    }

    & i {
        height: ${remcalc(28)};
        width: ${remcalc(28)};
        background: ${props => props.theme.white};
        display: inline-block;
        border-radius: ${remcalc(100)};
        margin-top: ${remcalc(2)};
        margin-left: ${remcalc(2)};
        transition: all 0.2s ease-in-out;
        pointer-events: none;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }

    &:active {
        background-color: #a6b9cb;

        & > i {
            width: ${remcalc(34)};
            box-shadow: 0 ${remcalc(2)} ${remcalc(4)} 0 rgba(0, 0, 0, 0.2);
        }
    }

    &:active &:hover > i {
        box-shadow: 0 ${remcalc(1)} ${remcalc(2)} 0 rgba(0, 0, 0, 0.2);
        transform: scale(1.01);
    }

    @media (min-width: ${remcalc(768)}) {
        margin-left: 0;
    }
`

export default ({ hideViewed, client }) => {
    return (
        <Section>
            <Input
                type="checkbox"
                id="show-viewed"
                ariaLabel="Hide Watched Talks"
                onClick={() =>
                    client.writeData({
                        data: { hideViewed: !hideViewed }
                    })
                }
                checked={hideViewed}
            />
            <Label htmlFor="show-viewed">
                <i />
            </Label>
        </Section>
    )
}

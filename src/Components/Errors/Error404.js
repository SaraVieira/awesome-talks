import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    text-align: center;
    padding: ${remcalc(30)};
    color: ${props => props.theme.main};

    h1 {
        font-size: ${remcalc(30)};
        margin-bottom: ${remcalc(30)};
    }

    p {
        font-size: ${remcalc(18)};
        margin: ${remcalc(20)} 0;
    }
`

const Button = styled.div`
    margin-top: ${remcalc(40)};
    a {
        border: 0;
        padding: ${remcalc(7)} ${remcalc(25)};
        background: rgb(238, 238, 238);
        font-weight: 700;
        border-radius: 4px;
        text-transform: uppercase;
        color: #333;
        bos-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12),
            0 2px 4px 0 rgba(0, 0, 0, 0.08);

        &:hover {
            color: #555;
        }

        &:after {
            height: 0;
            background: none;
        }
    }
`

export default () => (
    <Wrapper>
        <h1>Oh No!</h1>
        <h2>It looks like you are lost</h2>
        <p>The page {"you're"} looking for is not here</p>
        <Button>
            <Link to="/">Go Home</Link>
        </Button>
    </Wrapper>
)

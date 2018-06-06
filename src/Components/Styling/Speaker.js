import styled from 'styled-components'

export const Figure = styled.figure`
    position: relative;
    float: left;
    overflow: hidden;
    margin: 10px 1%;
    min-width: 220px;
    max-width: 220px;
    max-height: 220px;
    min-height: 220px;
    width: 100%;
    background: ${props => props.theme.main};
    color: ${props => props.theme.primary};
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    background: ${props => props.theme.blue};
    &:hover img {
        opacity: 1;
        transform: scale(1.1);
    }

    &:hover h2 {
        transform: skew(-10deg) rotate(-10deg) translate(-150%, -50%);
    }

    &:hover:before {
        transform: rotate(110deg) translateY(-150%);
    }
    &::before {
        height: 120%;
        width: 130%;
        top: 0;
        left: 0;
        content: '';
        background: ${props => props.theme.primary};
        position: absolute;
        transition: all 0.3s ease-in-out;
        transform: rotate(110deg) translateY(-33%) translateX(-7px);
    }

    * {
        box-sizing: border-box;
        transition: all 0.4s ease-in-out;
    }

    a {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        position: absolute;
        z-index: 1;
        padding: 0;
        border: none;
    }
`

export const Img = styled.img`
    max-width: 100%;
    position: relative;
    opacity: 0.4;
`

export const Caption = styled.figcaption`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`

export const Name = styled.h2`
    position: absolute;
    left: 20px;
    right: 20px;
    display: inline-block;
    background: ${props => props.theme.main};
    transform: skew(-10deg) rotate(-10deg) translate(0, -50%);
    padding: 12px 5px;
    margin: 0;
    bottom: 0;
    text-transform: uppercase;
    font-weight: 400;
    span {
        font-weight: 800;
        display: block;
    }
`

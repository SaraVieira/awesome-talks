import React, { Component } from 'react'
import styled from 'styled-components'
import { BANNER_KEY, getStorage, setStorage } from './../Utils/state'

const Banner = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgb(238, 238, 238);
    color: rgb(51, 51, 51);
    height: auto;
    z-index: 1000;
    font-size: 16px;
    text-align: center;
    padding: 10px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BannerText = styled.div`
    line-height: 1.8;
    margin-right: 5px;
`
const BannerClose = styled.div`
    float: right;
    display: block;
    padding: 5px 20px;
    margin-left: 5px;
    border-radius: 5px;
    cursor: pointer;
    color: rgb(0, 0, 0);
    background: rgb(241, 214, 0);
    text-align: center;
    flex-shrink: 0;
`

class CookieBanner extends Component {
    state = {
        shown: false
    }

    handleClose = event => {
        this.setState(
            {
                shown: true
            },
            () => {
                setStorage(BANNER_KEY, '1')
            }
        )
    }

    render() {
        return getStorage(BANNER_KEY) || this.state.shown === true ? (
            ''
        ) : (
            <Banner className="cookies">
                <BannerText>
                    We use cookies for favorites, watched and also check if you
                    in dark / light mode. By continuing to visit this site you
                    agree to our use of cookies.
                </BannerText>
                <BannerClose onClick={this.handleClose}>Got it!</BannerClose>
            </Banner>
        )
    }
}

export default CookieBanner

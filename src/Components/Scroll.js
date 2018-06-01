import React, { Component } from 'react'
import styled from 'styled-components'

const Load = styled.div`
    text-align: center;
    padding: 20px 0;
`

class Scroll extends Component {
    handleScroll = () => {
        const windowHeight =
            'innerHeight' in window
                ? window.innerHeight
                : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        )
        const windowBottom = windowHeight + window.pageYOffset
        if (windowBottom >= docHeight) {
            this.props.onBottom()
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        const { show } = this.props
        return show ? <Load>Loading Awesome Videos</Load> : null
    }
}

export default Scroll

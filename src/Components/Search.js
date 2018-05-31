import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import { Query, withApollo } from 'react-apollo'
import remcalc from 'remcalc'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
    display: flex;
    width: ${remcalc(300)};
    position: relative;
    transition: all 0.25s ease-in-out;

    @media (min-width: ${remcalc(769)}) {
        &.expanded {
            margin-left: -100%;
            width: 100%;
        }
    }
`

const Icon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`

const SearchIcon = Icon.extend`
    left: ${remcalc(20)};
    max-width: ${remcalc(20)};
`

const CloseIcon = Icon.extend`
    right: ${remcalc(20)};
`

const Input = styled.input`
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding: ${remcalc(30)} ${remcalc(30)} ${remcalc(30)} ${remcalc(58)};
    width: 100%;
    font-size: ${remcalc(34)};
    font-weight: 300;
    outline: none;

    @media (max-width: ${remcalc(768)}) {
        font-size: ${remcalc(20)};
    }
`

class Search extends Component {
    input

    state = {
        focused: false
    }

    onFocus = () => {
        this.setState({ focused: true })
    }

    onBlur = () => {
        this.setState({ focused: false })
    }

    onChange = debounce(() => {
        this.props.client.writeData({
            data: { [this.props.keyName]: this.input.value }
        })
    }, 200)

    render() {
        const { keyName, query } = this.props

        return (
            <Query query={query}>
                {({ data, client }) => (
                    <Wrapper
                        className={`${
                            this.state.focused || data[keyName].length
                                ? 'expanded'
                                : ''
                        }`}
                    >
                        <SearchIcon icon="search" size="lg" />
                        {data[keyName].length > 0 && (
                            <CloseIcon
                                icon="times"
                                size="lg"
                                onClick={() => {
                                    this.input.value = ''
                                    client.writeData({
                                        data: { [keyName]: '' }
                                    })
                                }}
                            />
                        )}
                        <Input
                            innerRef={node => (this.input = node)}
                            onBlur={this.onBlur}
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            placeholder="Search"
                            type="text"
                        />
                    </Wrapper>
                )}
            </Query>
        )
    }
}

export default withApollo(Search)

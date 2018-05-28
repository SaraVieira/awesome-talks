import React, { Component } from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import { Query } from 'react-apollo'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import GET_SEARCH from '../Queries/GET_SEARCH'

const Form = styled.form`
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
`

const CloseIcon = Icon.extend`
  right: ${remcalc(20)};
`

const Input = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: ${remcalc(20)} ${remcalc(20)} ${remcalc(20)} ${remcalc(58)};
  width: 100%;

  font-size: ${remcalc(32)};
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

  onSubmit = e => {
    e.preventDefault()

    this.props.client.writeData({ data: { search: this.input.value } })
  }

  render() {
    return (
      <Query query={GET_SEARCH}>
        {({ data: { search }, client }) => (
          <Form
            className={`${
              this.state.focused || search.length ? 'expanded' : ''
            }`}
            onSubmit={this.onSubmit}
          >
            <SearchIcon icon="search" size="lg" />
            {search.length > 0 && (
              <CloseIcon
                icon="times"
                size="lg"
                onClick={() => client.writeData({ data: { search: '' } })}
              />
            )}
            <Input
              innerRef={node => (this.input = node)}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              placeholder="Search"
              type="text"
              value={search}
            />
          </Form>
        )}
      </Query>
    )
  }
}

export default Search

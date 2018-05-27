import { Component } from 'preact'
import styled from 'styled-components'
import Flex from 'styled-flex-component'
import debounce from 'lodash.debounce'

const SearchIcon = styled.svg`
  width: 30px;

  path {
    fill: #808080;
  }
`

const SearchInputStyle = {
  border: '0 none',
  borderBottom: '1px solid #808080',
  height: 36,
  lineHeight: 1.4,
  padding: '4px 6px',
  boxSizing: 'border-box',
  fontSize: '1rem',
  marginRight: '1rem',
  transition: 'border 250ms ease'
}

export default class Search extends Component {
  state = {
    term: ''
  }
  searchHandler = e => {
    this.setState({ term: e.target.value }, this.triggerChangeCallback)
  }
  triggerChangeCallback = () => {
    this.props.onChange(this.state)
  }
  render() {
    return (
      <Flex alignCenter>
        <input
          style={SearchInputStyle}
          type="text"
          onChange={debounce(this.searchHandler, 300)}
          value={this.state.term}
        />
        <SearchIcon viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
          <path d="m19 1c-6.6 0-12 5.4-12 12 0 2.6.8 5 2.2 6.9l-1 1.1c-.8 0-1.7.2-2.3.9l-4 4c-.5.5-.9 1.2-.9 2.1 0 2 1.7 3 3 3 .8 0 1.5-.3 2.1-.9l4-4c.6-.6.9-1.5.9-2.3l1.1-1.1c2 1.4 4.4 2.2 6.9 2.2 6.6 0 12-5.4 12-12 0-6.5-5.4-11.9-12-11.9zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
        </SearchIcon>
      </Flex>
    )
  }
}

import styled from 'styled-components'

const Search = styled.svg`
  width: 30px;

  path {
    fill: #808080;
  }
`

export default () => (
  <Search viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
    <path d="m19 1c-6.6 0-12 5.4-12 12 0 2.6.8 5 2.2 6.9l-1 1.1c-.8 0-1.7.2-2.3.9l-4 4c-.5.5-.9 1.2-.9 2.1 0 2 1.7 3 3 3 .8 0 1.5-.3 2.1-.9l4-4c.6-.6.9-1.5.9-2.3l1.1-1.1c2 1.4 4.4 2.2 6.9 2.2 6.6 0 12-5.4 12-12 0-6.5-5.4-11.9-12-11.9zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
  </Search>
)

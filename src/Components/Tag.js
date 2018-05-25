import { Link } from 'preact-router/match'
import styled from 'styled-components'

export default styled(Link)`
  background-color: #fbfbfb;
  border: 1px solid #2e3d46;
  padding: 6px 15px;
  color: #2e3d46;
  border-radius: 5px;
  transition: all 300ms ease-in-out;
  margin: 5px;
  text-decoration: none;

  &:after {
    width: 0;
    height: 0;
  }

  &:hover {
    border: 1px solid #337294;
    color: #337294;
  }
`

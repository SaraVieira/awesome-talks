import { Link } from 'react-router-dom'
import styled from 'styled-components'
import remcalc from 'remcalc'

export default styled(Link)`
  background-color: #fbfbfb;
  border: ${remcalc(1)} solid #2e3d46;
  padding: ${remcalc(6)} ${remcalc(15)};
  color: #2e3d46;
  border-radius: ${remcalc(5)};
  transition: all 300ms ease-in-out;
  margin: ${remcalc(5)};
  text-decoration: none;

  &:after {
    width: 0;
    height: 0;
  }

  &:hover {
    border: ${remcalc(1)} solid #337294;
    color: #337294;
  }
`

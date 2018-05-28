import styled from 'styled-components'
import { Link } from 'preact-router/match'
import remcalc from 'remcalc'

export default styled(Link)`
  opacity: 1;
  border: none;
  opacity: 0.8;
  font-weight: 500;
  color: ${props => props.theme.darkGrey};
  margin-top: ${remcalc(-10)};
  padding: 0;
  margin-bottom: ${remcalc(10)};
  margin-right: ${remcalc(10)};

  &:hover {
    opacity: 1;
    color: ${props => props.theme.darkGrey};
  }
  &:after {
    display: none;
  }
`

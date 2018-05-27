import styled from 'styled-components'
import { Link } from 'preact-router/match'
import remcalc from 'remcalc'

export default styled(Link)`
  opacity: 1;
  border: none;
  opacity: 0.8;
  font-weight: 600;
  color: ${props => props.theme.black};
  margin-top: ${remcalc(-20)};
  padding: 0;
  margin-bottom: ${remcalc(10)};
  margin-right: ${remcalc(10)};

  &:hover {
    opacity: 1;
    color: ${props => props.theme.black};
  }
  &:after {
    display: none;
  }
`

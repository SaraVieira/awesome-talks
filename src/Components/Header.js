import styled from 'styled-components'
import { Row } from 'react-styled-flexboxgrid'
import { Component } from 'preact'
// import Search from './Search'
import Flex from 'styled-flex-component'

const Title = styled.h1`
  opacity: 0.8;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 90px;
  line-height: 1.2;
  color: #000000;
  letter-spacing: -2.46px;
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 60px;
    margin: auto;
    margin-bottom: 40px;
  }
`

export default class extends Component {
  state = { search: false, term: null }

  render = ({ title = 'Talks', noSearch }) => (
    <Row>
      <Flex full alignCenter justifyBetween>
        <Title>{title}</Title>
        {/* {noSearch ? null : <Search />} */}
      </Flex>
    </Row>
  )
}

import styled from "styled-components"
import { Row } from "react-styled-flexboxgrid"
import { Component } from "preact"
import Search from "./Search"
import Flex from "styled-flex-component"

const Title = styled.h1`
  opacity: 0.5;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 102px;
  color: #000000;
  letter-spacing: -2.46px;

  @media (max-width: 600px) {
    font-size: 60px;
  }
`

export default class extends Component {
  state = { search: false, term: null }

  render = () => {
    return (
      <Row>
        <Flex full alignCenter justifyBetween>
          <Title>Talks</Title>
          <Search />
        </Flex>
      </Row>
    )
  }
}

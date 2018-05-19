import styled from "styled-components"
import { Component } from "preact"
import { Col } from "react-styled-flexboxgrid"
import is from "styled-is"
import Flex from "styled-flex-component"

const Button = styled.button`
  background: transparent;
  display: block;
  border: none;
  color: #f61c0d;
  font-weight: bold;
  text-align: right;
  padding: 0;
`

const Video = styled.section`
  position: relative;
`

const Speaker = styled.p`
  opacity: 0.6;
  font-family: Montserrat-Light;
  font-size: 12px;
  color: #000000;
  letter-spacing: 0.09px;
  text-align: left;
  line-height: 21px;
  padding-left: 20px;
`

const Name = styled.h2`
  font-family: Montserrat;
  font-size: 400;
  font-size: 26px;
  color: #000000;
  letter-spacing: -0.63px;
`

const Description = styled.p`
  opacity: 0.6;
  font-family: Montserrat-Light;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.11px;
  line-height: 21px;
`

const Column = styled(Col)`
  transition: all 200ms ease;
  margin-bottom: 20px;
`
const Iframe = styled.iframe`
  position: relative;
  z-index: 3;
  border: none;
  transition: all 200ms ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.12);
`

export default class extends Component {
  state = { isDescriptionClicked: false }

  toggleDescription = () =>
    this.setState(({ isDescriptionClicked }) => {
      return { isDescriptionClicked: !isDescriptionClicked }
    })

  render = ({ speaker, description, link, name }, { isDescriptionClicked }) => (
    <Column
      md={isDescriptionClicked ? 12 : 4}
      xs={isDescriptionClicked ? 12 : 6}
    >
      <Video>
        <Iframe
          title={name}
          width="100%"
          height={isDescriptionClicked ? "500" : 180}
          src={`https://www.youtube.com/embed/${link}`}
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
      </Video>

      <Flex justifyBetween alignCenter>
        <Name>{name}</Name>
        <Speaker>{speaker.join(", ")}</Speaker>
      </Flex>
      <Button onClick={this.toggleDescription}>
        {isDescriptionClicked ? "Hide" : "Show"} Description
      </Button>

      {isDescriptionClicked ? <Description>{description}</Description> : null}
    </Column>
  )
}

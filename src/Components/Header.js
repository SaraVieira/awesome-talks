import styled from 'styled-components'
import { Row } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
// import Search from './Search'
import Flex from 'styled-flex-component'
import SHOW_VIEWED from '../Queries/SHOW_VIEWED'

const Title = styled.h1`
  opacity: 0.8;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 90px;
  line-height: 1.2;
  color: #000000;
  letter-spacing: -2.46px;
  margin-top: 0;
  margin-bottom: 0;

  @media (max-width: 768px) {
    font-size: 30px;
    margin: auto;
    margin-bottom: 40px;
  }
`
const Label = styled.label`
  display: block;
  width: 54px;
  height: 32px;
  margin: 0px auto;
  border-radius: 100px;
  -webkit-transition: all 0.2s ease-in-out;
  background-color: #e6e9ec;
  margin-bottom: 60px;

  &:after {
    display: inline-block;
    content: 'Hide Watched Talks';
    position: relative;
    width: 150px;
    left: 60px;
    top: -30px;
  }

  & i {
    height: 28px;
    width: 28px;
    background: #ffffff;
    display: inline-block;
    border-radius: 100px;
    margin-top: 2px;
    margin-left: 2px;
    transition: all 0.2s ease-in-out;
    pointer-events: none;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }

  &:active {
    background-color: #a6b9cb;

    & > i {
      width: 34px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }

  &:active &:hover > i {
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
  }
`

const Input = styled.input`
  display: none;

  &:checked + label {
    background-color: #51b257;
  }

  &:checked + label > i {
    margin-left: 24px;
  }

  &:checked + label:active > i {
    margin-left: 18px;
  }
`

export default ({ title = 'Talks', noSearch }) => (
  <Row>
    <Flex full alignCenter justifyBetween>
      <Title>{title}</Title>
      {/* {noSearch ? null : <Search />} */}
    </Flex>
    <Query query={SHOW_VIEWED}>
      {({ data: { hideViewed }, client }) => (
        <div>
          <Input
            type="checkbox"
            id="show-viewed"
            ariaLabel="Hide Watched Talks"
            onClick={() =>
              client.writeData({ data: { hideViewed: !hideViewed } })
            }
            checked={hideViewed}
          />
          <Label htmlFor="show-viewed">
            <i />
          </Label>
        </div>
      )}
    </Query>
  </Row>
)

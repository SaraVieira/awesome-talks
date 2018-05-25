import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Query } from 'react-apollo'
import Match from 'preact-router/match'
import Flex from 'styled-flex-component'
// import Search from './Search'
import SHOW_VIEWED from '../Queries/SHOW_VIEWED'
import is from 'styled-is'

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

  ${is('small')`
    font-size: 24px;

    @media (max-width: 768px) {
        margin-bottom: 20px;
    }
  `};

  @media (max-width: 768px) {
    font-size: 30px;
    position: relative;
    margin: auto;
    margin-bottom: 40px;
    margin-top: -20px;
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

const Section = styled.div`
  @media (max-width: 768px) {
    margin: auto;
    left: -70px;
    position: relative;
    top: -45px;
  }
`

const Wrapper = styled(Row)`
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin: auto;
  }

  ${is('small')`
    margin-bottom: 20px;
  `};
`

export default ({ title = 'Talks', noSearch, small }) => (
  <Wrapper small={small}>
    <Col xs={12}>
      <Flex full alignCenter justifyBetween>
        <Title small={small}>{title}</Title>
        {/* {noSearch ? null : <Search />} */}
      </Flex>
      <Match path="/">
        {({ matches }) =>
          matches && (
            <Query query={SHOW_VIEWED}>
              {({ data: { hideViewed }, client }) => (
                <Section>
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
                </Section>
              )}
            </Query>
          )
        }
      </Match>
    </Col>
  </Wrapper>
)

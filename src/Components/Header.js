import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
// import { Query } from 'react-apollo'
import Flex from 'styled-flex-component'
import remcalc from 'remcalc'
import is from 'styled-is'
import Search from './Search'
// import SHOW_VIEWED from '../Queries/SHOW_VIEWED'

export const Title = styled.h1`
    opacity: 0.8;
    font-family: Montserrat;
    font-weight: 600;
    font-size: ${remcalc(90)};
    line-height: 1.2;
    color: ${props => props.theme.black};
    letter-spacing: ${remcalc(-2.46)};
    margin-top: 0;
    margin-bottom: 0;

    ${is('small')`
    font-size: ${remcalc(24)};

    @media (max-width: ${remcalc(768)}) {
        margin-bottom: ${remcalc(20)};
    }
  `};

    @media (max-width: ${remcalc(768)}) {
        font-size: ${remcalc(30)};
        position: relative;
        margin: auto;
        margin-bottom: ${remcalc(40)};
        margin-top: ${remcalc(-20)};
    }
`

const SearchWrapper = styled(Flex)`
    @media (max-width: ${remcalc(768)}) {
        flex-direction: column;
        margin-bottom: ${remcalc(30)};
        justify-content: flex-start;

        h1 {
            margin-bottom: 0;
        }
    }
`

// const Label = styled.label`
//   display: block;
//   width: ${remcalc(54)};
//   height: ${remcalc(32)};
//   margin: 0 auto;
//   border-radius: ${remcalc(100)};
//   transition: all 0.2s ease-in-out;
//   background-color: ${props => props.theme.lightGrey};

//   &:after {
//     display: inline-block;
//     content: 'Hide Watched Talks';
//     position: relative;
//     width: ${remcalc(150)};
//     left: ${remcalc(60)};
//     top: ${remcalc(-30)};
//   }

//   & i {
//     height: ${remcalc(28)};
//     width: ${remcalc(28)};
//     background: ${props => props.theme.white};
//     display: inline-block;
//     border-radius: ${remcalc(100)};
//     margin-top: ${remcalc(2)};
//     margin-left: ${remcalc(2)};
//     transition: all 0.2s ease-in-out;
//     pointer-events: none;
//     box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
//   }

//   &:active {
//     background-color: #a6b9cb;

//     & > i {
//       width: ${remcalc(34)};
//       box-shadow: 0 ${remcalc(2)} ${remcalc(4)} 0 rgba(0, 0, 0, 0.2);
//     }
//   }

//   &:active &:hover > i {
//     box-shadow: 0 ${remcalc(1)} ${remcalc(2)} 0 rgba(0, 0, 0, 0.2);
//     transform: scale(1.01);
//   }

//   @media (min-width: ${remcalc(768)}) {
//     margin-left: 0;
//   }
// `

// const Input = styled.input`
//   display: none;

//   &:checked + label {
//     background-color: ${props => props.theme.green};
//   }

//   &:checked + label > i {
//     margin-left: ${remcalc(24)};
//   }

//   &:checked + label:active > i {
//     margin-left: ${remcalc(18)};
//   }
// `

// const Section = styled.div`
//   @media (max-width: ${remcalc(768)}) {
//     margin: auto;
//     left: ${remcalc(-70)};
//     position: relative;
//     top: ${remcalc(-65)};
//   }
// `

const Wrapper = styled(Row)`
    margin-bottom: ${remcalc(60)};

    @media (max-width: ${remcalc(768)}) {
        margin: auto;
        margin-bottom: ${remcalc(20)};
    }

    ${is('small')`
    margin-bottom: ${remcalc(20)};
  `};
`

export default ({ title = 'Talks', noSearch, small, onSearch }) => (
    <Wrapper small={small}>
        <Col xs={12}>
            <SearchWrapper full alignCenter justifyBetween>
                <Title small={small}>{title}</Title>
                {noSearch ? null : <Search onChange={onSearch} />}
            </SearchWrapper>
            {/* <Match path="/">
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
      </Match> */}
        </Col>
    </Wrapper>
)

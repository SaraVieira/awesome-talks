import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'

import Flex from 'styled-flex-component'
import remcalc from 'remcalc'
import is from 'styled-is'
import Search from '../Search'
import { withRouter } from 'react-router'
import HideViewed from '../HideViewed'

export const Title = styled.h1`
    opacity: 0.8;
    font-family: Avenir, Montserrat;
    font-weight: 600;
    font-size: ${remcalc(90)};
    line-height: 1.2;
    color: ${props => props.theme.main};
    letter-spacing: ${remcalc(-0.25)};
    margin-top: 0;
    margin-bottom: 0;
    text-transform: capitalize;
    ${is('code')`
    font-family: 'Space Mono', monospace;
  `};

    ${is('medium')`
    font-size: ${remcalc(70)};

    @media (max-width: ${remcalc(768)}) {
        margin-bottom: ${remcalc(48)};
    }
  `};

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

const Wrapper = styled(Row)`
    margin-bottom: ${remcalc(60)};

    ${is('noMargin')`
        margin-bottom: ${remcalc(0)};
  `};

    @media (max-width: ${remcalc(768)}) {
        margin: auto;
        margin-bottom: ${remcalc(20)};
    }

    ${is('small')`
        margin-bottom: ${remcalc(20)};
  `};
`

const Header = ({
    title = 'Talks',
    noSearch,
    small,
    match,
    keyName,
    query,
    HideViewed,
    code,
    noMargin,
    medium
}) => (
    <Wrapper small={small} medium={medium} noMargin={noMargin}>
        <Col xs={12}>
            <SearchWrapper full alignCenter justifyBetween>
                <Title code={code} medium={medium} small={small}>
                    {title}
                </Title>
                {noSearch ? null : <Search keyName={keyName} query={query} />}
            </SearchWrapper>
            {match.path === '/' ? <HideViewed /> : null}
        </Col>
    </Wrapper>
)

export default withRouter(props => (
    <Header HideViewed={HideViewed} {...props} />
))

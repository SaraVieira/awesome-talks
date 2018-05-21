import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Query } from 'react-apollo'

const Beat = keyframes`
    0% {
      transform: scale(0.95);
    }
    5% {
      transform: scale(1.1);
    }
    39% {
      transform: scale(0.85);
    }
    45% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0.9);
    }
`

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  transform-origin: 32px 32px;

  & div {
    top: 23px;
    left: 19px;
    position: absolute;
    width: 26px;
    height: 26px;
    background: #ff0000;
    animation: ${Beat} 1s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  & div:after,
  & div:before {
    content: ' ';
    position: absolute;
    display: block;
    width: 26px;
    height: 26px;
    background: #ff0000;
  }

  & div:before {
    left: -17px;
    border-radius: 50% 0 0 50%;
  }

  & div:after {
    top: -17px;
    border-radius: 50% 50% 0 0;
  }
`

export default ({ children, ...props }) => (
  <Query {...props}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) {
        return (
          <Loading class="lds-heart">
            <div />
          </Loading>
        )
      }
      if (error) return `Error!: ${error}`
      return children[0]({
        data,
        fetchMore
      })
    }}
  </Query>
)

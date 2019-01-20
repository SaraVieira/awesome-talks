import React from 'react'
import Flex from 'styled-flex-component'
import { Name, Button } from '../Styling/Text'

export default ({ onClick, duration }) => (
    <Flex wrap alignCenter>
        <Name>Duration</Name>
        <Button
            selected={duration === 1200}
            css={`
                margin-right: 10px;
            `}
            className="no-hover"
            onClick={() => {
                onClick(1200)
            }}
        >
            Less than 20 min
        </Button>
        <Button
            selected={duration === 2700}
            css={`
                margin-right: 10px;
            `}
            className="no-hover"
            onClick={() => {
                onClick(2700)
            }}
        >
            Less than 45 min
        </Button>
        <Button
            selected={duration === undefined}
            css={`
                margin-right: 10px;
            `}
            className="no-hover"
            onClick={() => {
                onClick(undefined)
            }}
        >
            All
        </Button>
    </Flex>
)

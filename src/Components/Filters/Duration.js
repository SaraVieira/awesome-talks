import React from 'react'
import Flex from 'styled-flex-component'
import { Name, Button } from '../Styling/Text'

export default ({ onClick, duration }) => (
    <Flex wrap alignCenter>
        <Name>Duration</Name>
        <Button
            selected={duration === 1200}
            style={{ marginRight: 10 }}
            className="no-hover"
            onClick={() => {
                onClick(1200)
            }}
        >
            Less that 20 min
        </Button>
        <Button
            selected={duration === 2700}
            style={{ marginRight: 10 }}
            className="no-hover"
            onClick={() => {
                onClick(2700)
            }}
        >
            Less that 45 min
        </Button>
        <Button
            selected={duration === undefined}
            style={{ marginRight: 10 }}
            className="no-hover"
            onClick={() => {
                onClick(undefined)
            }}
        >
            All
        </Button>
    </Flex>
)

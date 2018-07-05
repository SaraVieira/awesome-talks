import React from 'react'
import Flex from 'styled-flex-component'
import { Name, Button } from '../Styling/Text'

export default ({ onClick, year }) => (
    <Flex wrap alignCenter>
        <Name>Published year</Name>
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear() - 3}
            onClick={onClick}
        />
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear() - 2}
            onClick={onClick}
        />
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear() - 1}
            onClick={onClick}
        />
        <PublishedYearButton
            year={year}
            value={new Date().getFullYear()}
            onClick={onClick}
        />
        <PublishedYearButton year={year} value={undefined} onClick={onClick} />
    </Flex>
)

const PublishedYearButton = ({ value, onClick, year }) => (
    <Button
        style={{ marginRight: 10 }}
        className="no-hover"
        selected={year === value}
        onClick={() => {
            onClick(value)
        }}
    >
        {value || 'All'}
    </Button>
)

import React from 'react'
import Flex from 'styled-flex-component'
import { Name } from '../Styling/Text'
import { Select } from '../Styling/Forms'

export default ({ onChange }) => (
    <Flex alignCenter>
        <Name>Order</Name>
        <Select onChange={onChange}>
            <option value="createdAt_DESC">Created At (DESC)</option>
            <option value="createdAt_ASC">Created At (ASC)</option>
            <option value="duration_DESC">Duration (DESC)</option>
            <option value="duration_ASC">Duration (ASC)</option>
            <option value="likes_DESC">Likes (DESC)</option>
            <option value="likes_ASC">Likes (ASC)</option>
            <option value="name_DESC">Name (DESC)</option>
            <option value="name_ASC">Name (ASC)</option>
            <option value="views_DESC">Views (DESC)</option>
            <option value="views_ASC">Views (ASC)</option>
            <option value="year_DESC">Year (DESC)</option>
            <option value="year_ASC">Year (ASC)</option>
        </Select>
    </Flex>
)

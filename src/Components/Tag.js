import React from 'react'
import Item from './../Components/Styling/Item'

const makeTag = name => name.replace(/\s+/g, '-').toLowerCase()
const makeLink = name => `/category/${makeTag(name)}`

export default ({ name, id, _videosMeta: { count } }) => (
    <Item className="no-hover" to={makeLink(name)}>
        <span>#{makeTag(name)}</span>
        <span className="count">
            {count}
            {count > 1 ? ' Videos' : ' Video'}
        </span>
    </Item>
)

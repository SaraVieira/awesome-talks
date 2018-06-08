import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Shallow from '../../../Tests/shallow'
import Item from '../Item'

test('Renders Item', () => {
    const Wrapper = Shallow(
        <MemoryRouter>
            <Item to="https://google.com" />
        </MemoryRouter>
    )
    expect(Wrapper.children()).toMatchSnapshot()
})

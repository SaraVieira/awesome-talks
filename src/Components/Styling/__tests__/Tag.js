import React from 'react'
import Shallow from '../../../Tests/shallow'
import { MemoryRouter } from 'react-router-dom'
import Tag from '../Tag'

test('Renders Tag', () => {
    const Wrapper = Shallow(
        <MemoryRouter>
            <Tag />
        </MemoryRouter>
    )
    expect(Wrapper).toMatchSnapshot()
})

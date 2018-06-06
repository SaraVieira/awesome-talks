import React from 'react'
import Shallow from '../../../Tests/shallow'
import { Figure, Name } from '../Speaker'

test('Renders Figure', () => {
    const Wrapper = Shallow(<Figure />)

    expect(Wrapper).toMatchSnapshot()
})

test('Renders Name', () => {
    const Wrapper = Shallow(<Name />)

    expect(Wrapper).toHaveStyleRule('text-transform', 'uppercase')
    expect(Wrapper).toMatchSnapshot()
})

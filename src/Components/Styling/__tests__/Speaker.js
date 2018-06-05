import React from 'react'
import Shallow from '../../../Tests/shallow'
import { Figure, Name } from '../Speaker'

test('Renders Figure', () => {
    const Wrapper = Shallow(<Figure />)

    expect(Wrapper).toHaveStyleRule('background', '#337294')
    expect(Wrapper).toHaveStyleRule('color', '#fff')
    expect(Wrapper).toMatchSnapshot()
})

test('Renders Name', () => {
    const Wrapper = Shallow(<Name />)

    expect(Wrapper).toHaveStyleRule('background', '#000')
    expect(Wrapper).toHaveStyleRule('text-transform', 'uppercase')
    expect(Wrapper).toMatchSnapshot()
})

import React from 'react'
import Button from '../Button'
import Shallow from '../../../Tests/shallow'

test('Renders Button', () => {
    const Wrapper = Shallow(<Button />)

    expect(Wrapper).toHaveStyleRule('border-color', 'transparent')
    expect(Wrapper).toHaveStyleRule('background-color', '#60b7e6')
    expect(Wrapper).toMatchSnapshot()
})

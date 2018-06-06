import React from 'react'
import remcalc from 'remcalc'
import Shallow from '../../../Tests/shallow'
import Input from '../Input'

test('Renders Input', () => {
    const Wrapper = Shallow(<Input />)

    expect(Wrapper).toHaveStyleRule('border-bottom', `${remcalc(1)} solid #ccc`)
    expect(Wrapper).toHaveStyleRule('font-size', remcalc(15))
    expect(Wrapper).toMatchSnapshot()
})

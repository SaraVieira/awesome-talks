import React from 'react'
import Shallow from '../../../Tests/shallow'
import Heart from '../Heart'

test('Renders Heart', () => {
    const Wrapper = Shallow(<Heart />)

    // expect(Wrapper.find('svg')).toHaveStyleRule('fill', 'rgb(214, 214, 214)')
    expect(Wrapper).toMatchSnapshot()
})

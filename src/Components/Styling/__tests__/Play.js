import React from 'react'
import Shallow from '../../../Tests/shallow'
import Play from '../Play'

test('Renders Play', () => {
    const Wrapper = Shallow(<Play />)

    expect(Wrapper).toHaveStyleRule('background', '#282828')
    expect(Wrapper).toHaveStyleRule('height', '3em')
    expect(Wrapper).toMatchSnapshot()
})

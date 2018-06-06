import React from 'react'
import remcalc from 'remcalc'
import Shallow from '../../../Tests/shallow'
import Loading from '../Loading'

test('Renders Loading', () => {
    const Wrapper = Shallow(<Loading />)

    expect(Wrapper).toHaveStyleRule('width', remcalc(64))
    expect(Wrapper).toHaveStyleRule('height', remcalc(64))
    expect(Wrapper).toMatchSnapshot()
})

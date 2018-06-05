import React from 'react'
import { shallow } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../Utils/theme'
import 'jest-styled-components'

const shallowWithTheme = (children, options) => {
    const wrapper = shallow(
        <ThemeProvider theme={theme}>{children}</ThemeProvider>,
        options
    )
    const instance = wrapper.instance()
    return wrapper.shallow({ context: instance.getChildContext() })
}

export default shallowWithTheme

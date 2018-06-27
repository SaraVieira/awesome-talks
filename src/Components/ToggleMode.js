import React from 'react'
import { Query, Mutation } from 'react-apollo'
import styled from 'styled-components'
import remcalc from 'remcalc'

import SWITCH_MODE, { GET_MODE } from '../Queries/Local/SWITCH_MODE'
import DARK_MOON from '../assets/dark_moon.svg'
import LIGHT_MOON from '../assets/light_moon.svg'

const Img = styled.img`
    height: ${remcalc(30)};
    cursor: pointer;
`

const modeObject = {
    DARK: {
        src: LIGHT_MOON,
        alt: 'enable light mode',
        pressed: 'false'
    },
    LIGHT: {
        src: DARK_MOON,
        alt: 'enable dark mode',
        pressed: 'true'
    }
}

export default () => (
    <Mutation mutation={SWITCH_MODE}>
        {switchMode => (
            <Query query={GET_MODE}>
                {({ data: { mode } }) => {
                    const { src, alt, pressed } = modeObject[mode]
                    return (
                        <Img
                            role="button"
                            aria-pressed={pressed}
                            title={alt}
                            onClick={switchMode}
                            src={src}
                            alt={alt}
                        />
                    )
                }}
            </Query>
        )}
    </Mutation>
)

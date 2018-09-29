import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SWITCH_MODE, { GET_MODE } from '../Queries/Local/SWITCH_MODE'

const modeObject = {
    DARK: {
        icon: 'sun',
        alt: 'enable light mode',
        pressed: 'false',
        color: 'rgb(241, 214, 0)'
    },
    LIGHT: {
        icon: 'moon',
        alt: 'enable dark mode',
        pressed: 'true',
        color: '#666'
    }
}

export default () => (
    <Mutation mutation={SWITCH_MODE}>
        {switchMode => (
            <Query query={GET_MODE}>
                {({ data: { mode } }) => {
                    const { icon, alt, pressed, color } = modeObject[mode]
                    return (
                        <FontAwesomeIcon
                            role="button"
                            size="lg"
                            icon={icon}
                            alt={alt}
                            pressed={pressed}
                            color={color}
                            onClick={switchMode}
                        />
                    )
                }}
            </Query>
        )}
    </Mutation>
)

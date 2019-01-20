import React from 'react'

import { storiesOf } from '@storybook/react'

import Video from './example'

storiesOf('Video', module).add('Default', () => {
    return (
        <div
            css={`
                width: 400px;
            `}
        >
            <Video />
        </div>
    )
})

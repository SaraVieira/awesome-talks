import React from 'react'

import { storiesOf } from '@storybook/react'

import { ThumbnailPlayer, YoutubePlayer } from './example'

storiesOf('Player', module)
    .add('Thumbnail Player', () => {
        return (
            <div
                css={`
                    width: 400px;
                `}
            >
                <ThumbnailPlayer />
            </div>
        )
    })
    .add('Youtube player', () => {
        return (
            <div
                css={`
                    width: 400px;
                `}
            >
                <YoutubePlayer />
            </div>
        )
    })

import React from 'react'
import { Favorited } from '../Favorite/example'
import { Player } from './index'
import { action } from '@storybook/addon-actions'

export const ThumbnailPlayer = () => {
    const props = {
        cinemaMode: false,
        id: 1,
        link: `i2iCyulbnus`,
        showVideo: false,
        name: 'Live and Machine Learn',
        onClick: action('Thumbnail clicked'),
        onEnd: action('Video ended')
    }
    return <Player Favorite={Favorited} Watched={() => null} {...props} />
}

export const YoutubePlayer = () => {
    const props = {
        cinemaMode: false,
        id: 1,
        link: `i2iCyulbnus`,
        showVideo: true,
        name: 'Live and Machine Learn',
        onClick: action('Thumbnail clicked'),
        onEnd: action('Video ended')
    }
    return <Player Favorite={Favorited} Watched={() => null} {...props} />
}

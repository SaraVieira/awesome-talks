import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { SimpleVideo } from './index'
import { ThumbnailPlayer } from '../Player/example'

const speaker = [
    {
        id: 1,
        name: 'Sarah Drasner'
    }
]

const tags = [
    {
        id: 1,
        name: 'inspiration'
    },
    {
        id: 2,
        name: 'svg'
    }
]

export default () => {
    const props = {
        speaker,
        description: 'Sarah is awesome',
        link: 'i2iCyulbnus',
        name: 'Live and Machine Learn',
        tags,
        id: 1,
        cinemaMode: false,
        showCinemaVideo: false,
        Player: ThumbnailPlayer
    }

    return (
        <Router>
            <SimpleVideo {...props} />
        </Router>
    )
}

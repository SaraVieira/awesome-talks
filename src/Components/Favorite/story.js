import React from 'react'

import { storiesOf } from '@storybook/react'

import { Favorited, UnFavorited } from './example'

storiesOf('Favorite', module)
    .add('Favorited', () => {
        return <Favorited />
    })
    .add('Unfavorited', () => {
        return <UnFavorited />
    })

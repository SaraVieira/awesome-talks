import React from 'react'
import { action } from '@storybook/addon-actions'
import Favorite from './view'

const favorites = [1, 2, 3]

export const Favorited = () => {
    return (
        <Favorite
            favorites={favorites}
            addFavorite={action('add favorite')}
            removeFavorite={action('remove favorite')}
            id={3}
        />
    )
}

export const UnFavorited = () => (
    <Favorite
        favorites={favorites}
        addFavorite={action('add favorite')}
        removeFavorite={action('remove favorite')}
        id={4}
    />
)

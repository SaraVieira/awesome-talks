import React from 'react'
import { action } from '@storybook/addon-actions'
import HideViewed from './view'

const client = {
    writeData: action('Save hideviewed')
}

export const NotHidden = () => {
    return <HideViewed client={client} hideViewed={false} />
}

export const Hidden = () => {
    return <HideViewed client={client} hideViewed />
}

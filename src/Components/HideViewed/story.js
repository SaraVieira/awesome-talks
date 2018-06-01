import React from 'react'

import { storiesOf } from '@storybook/react'

import { Hidden, NotHidden } from './example'

storiesOf('HideViewed', module)
    .add('Hidden', () => {
        return <Hidden />
    })
    .add('Not Hidden', () => {
        return <NotHidden />
    })

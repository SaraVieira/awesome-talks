import React from 'react'
import SHOW_VIEWED from '../../Queries/SHOW_VIEWED'
import { Query } from 'react-apollo'
import HideViewed from './view'

export default () => (
    <Query query={SHOW_VIEWED}>
        {({ data: { hideViewed }, client }) => (
            <HideViewed hideViewed={hideViewed} client={client} />
        )}
    </Query>
)

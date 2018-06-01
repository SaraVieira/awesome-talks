import React from 'react'
import { graphql, compose } from 'react-apollo'
import GET_FAVORITES from '../../Queries/GET_FAVORITES'
import ADD_FAVORITE from '../../Queries/ADD_FAVORITE'
import REMOVE_FAVORITE from '../../Queries/REMOVE_FAVORITE'
import Query from './../Query'
import View from './view'

const Favorite = props => (
    <Query query={GET_FAVORITES}>
        {({ data: { favorites } }) => {
            return <View favorites={favorites} {...props} />
        }}
    </Query>
)

export default compose(
    graphql(REMOVE_FAVORITE, {
        props: ({ mutate }) => ({
            removeFavorite: id => mutate({ variables: { id } })
        })
    }),
    graphql(ADD_FAVORITE, {
        props: ({ mutate }) => ({
            addFavorite: id => mutate({ variables: { id } })
        })
    })
)(Favorite)

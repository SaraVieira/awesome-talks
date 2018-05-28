import React from 'react'
import { graphql, compose } from 'react-apollo'
import GET_FAVORITES from '../Queries/GET_FAVORITES'
import ADD_FAVORITE from '../Queries/ADD_FAVORITE'
import REMOVE_FAVORITE from '../Queries/REMOVE_FAVORITE'
import Query from './Query'
import Heart from './Styling/Heart'

import randomID from 'random-id'

const Favorite = ({ id, removeFavorite, addFavorite }) => (
  <Query query={GET_FAVORITES}>
    {({ data: { favorites } }) => {
      const inputId = randomID()
      return (
        <Heart>
          <input
            checked={favorites.includes(id)}
            type="checkbox"
            id={inputId}
            onClick={() =>
              favorites.includes(id) ? removeFavorite(id) : addFavorite(id)
            }
          />
          <label htmlFor={inputId}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
            </svg>
          </label>
        </Heart>
      )
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

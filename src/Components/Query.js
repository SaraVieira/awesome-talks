import React from 'react'
import { Query } from 'react-apollo'

export default ({ children, ...props }) => (
  <Query {...props}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) {
        return 'loading'
      }
      if (error) return `Error!: ${error}`
      return children[0]({
        data,
        fetchMore
      })
    }}
  </Query>
)

import React from "react"
import { Query } from "react-apollo"

export default ({ children, ...props }) => (
  <Query {...props}>
    {({ loading, error, data }) => {
      if (loading) return <div className="">Loading...</div>
      if (error) return `Error!: ${error}`
      return children(data)
    }}
  </Query>
)

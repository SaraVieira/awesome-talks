import React from 'react'
import { Query } from 'react-apollo'
import Loading from './Styling/Loading'

export default ({ children, ...props }) => {
    return (
        <Query {...props}>
            {({ loading, error, data, fetchMore, client }) => {
                if (loading) {
                    return (
                        <Loading class="lds-heart">
                            <div />
                        </Loading>
                    )
                }
                if (error) return `Error!: ${error}`
                return children({
                    data,
                    fetchMore,
                    client
                })
            }}
        </Query>
    )
}

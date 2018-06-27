import React from 'react'
import { Query } from 'react-apollo'
import Loading from './Styling/Loading'

const ModifiedQuery = ({ children, ...props }) => {
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

export default ModifiedQuery

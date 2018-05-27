import { Query } from 'react-apollo'
import Loading from './Styling/Loading'

export default ({ children, ...props }) => {
  return (
    <Query {...props}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) {
          return (
            <Loading class="lds-heart">
              <div />
            </Loading>
          )
        }
        if (error) return `Error!: ${error}`
        return children[0]({
          data,
          fetchMore
        })
      }}
    </Query>
  )
}

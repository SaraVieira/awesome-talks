import ALL_VIDEOS from '../Queries/ALL_VIDEOS'
import Query from './Query'

export default ({ children, params }) => {
  return (
    <Query query={ALL_VIDEOS} variables={params}>
      {({ data: { allVideoses } }) => {
        console.log(allVideoses)
        return children[0]({ allVideoses })
      }}
    </Query>
  )
}

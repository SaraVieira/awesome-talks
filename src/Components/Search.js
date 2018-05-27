import styled from 'styled-components'
import Flex from 'styled-flex-component'
import remcalc from 'remcalc'
import { Query } from 'react-apollo'
import GET_SEARCH from '../Queries/GET_SEARCH'

const Icon = styled.svg`
  width: ${remcalc(30)};
  cursor: pointer;

  path {
    fill: ${props => props.theme.darkGrey};
  }
`

export default () => (
  <Query query={GET_SEARCH}>
    {({ data: { search }, client }) => (
      <Flex alignCenter>
        <input
          className="search-input" // More perf withou styled-components
          type="text"
          value={search}
          onChange={e => client.writeData({ data: { search: e.target.value } })}
        />
        {search.length ? (
          <Icon
            viewBox="0 0 34 34"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Clear Search"
            onClick={e => client.writeData({ data: { search: '' } })}
          >
            <path
              d="M17 34c9.389 0 17-7.611 17-17S26.389 0 17 0 0 7.611 0 17s7.611 17 17 17zm2.828-17l4.586 4.586a2 2 0 0 1-2.828 2.828L17 19.828l-4.586 4.586a2 2 0 0 1-2.828-2.828L14.172 17l-4.586-4.586a2 2 0 0 1 2.828-2.828L17 14.172l4.586-4.586a2 2 0 0 1 2.828 2.828L19.828 17z"
              fillRule="nonzero"
            />
          </Icon>
        ) : (
          <Icon viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
            <path d="m19 1c-6.6 0-12 5.4-12 12 0 2.6.8 5 2.2 6.9l-1 1.1c-.8 0-1.7.2-2.3.9l-4 4c-.5.5-.9 1.2-.9 2.1 0 2 1.7 3 3 3 .8 0 1.5-.3 2.1-.9l4-4c.6-.6.9-1.5.9-2.3l1.1-1.1c2 1.4 4.4 2.2 6.9 2.2 6.6 0 12-5.4 12-12 0-6.5-5.4-11.9-12-11.9zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
          </Icon>
        )}
      </Flex>
    )}
  </Query>
)

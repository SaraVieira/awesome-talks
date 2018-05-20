import { injectGlobal } from 'styled-components'
import App from './Components/App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq'
})

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700');
  body {
    margin: 0;
    padding: 0;
    font-family: Montserrat;
    font-size: 14px;
    color: #666;
    letter-spacing: 0.11px;
    line-height: 21px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

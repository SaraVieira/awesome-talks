import React, { Fragment } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider, Query } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import 'isomorphic-fetch'

import App from './App'
import theme from './Utils/theme'
import Global from './Utils/global-styles'
import client from './Utils/stateLink'
import { GET_MODE } from './Queries/Local/SWITCH_MODE'

hydrate(
    <ApolloProvider client={client}>
        <Query query={GET_MODE}>
            {({ data: { mode } }) => (
                <ThemeProvider theme={theme[mode]}>
                    <Fragment>
                        <Router>
                            <App />
                        </Router>
                        <Global />
                    </Fragment>
                </ThemeProvider>
            )}
        </Query>
    </ApolloProvider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}

// require('offline-plugin/runtime').install()

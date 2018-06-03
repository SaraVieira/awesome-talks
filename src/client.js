import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import 'isomorphic-fetch'

import App from './App'
import theme from './Utils/theme'
import Global from './Utils/global-styles'
import client from './Utils/stateLink'

hydrate(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Global>
                <Router>
                    <App />
                </Router>
            </Global>
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}

// require('offline-plugin/runtime').install()

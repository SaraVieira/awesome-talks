import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import 'isomorphic-fetch'

import App from './App'
import theme from './Utils/theme'
import client from './Utils/stateLink'

hydrate(
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </ApolloProvider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}

// require('offline-plugin/runtime').install()

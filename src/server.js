import App from './App'
import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import {
    ServerStyleSheet,
    ThemeProvider,
    StyleSheetManager
} from 'styled-components'
import { getDataFromTree, ApolloProvider } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router'
import fontawesome from '@fortawesome/fontawesome'
import 'isomorphic-fetch'
import client from './Utils/stateLink'
import theme from './Utils/theme'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
const context = {}

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const sheet = new ServerStyleSheet()
        const Root = () => (
            <ApolloProvider client={client}>
                <StyleSheetManager sheet={sheet.instance}>
                    <ThemeProvider theme={theme}>
                        <StaticRouter location={req.url} context={context}>
                            <App />
                        </StaticRouter>
                    </ThemeProvider>
                </StyleSheetManager>
            </ApolloProvider>
        )

        getDataFromTree(Root()).then(() => {
            const initialApolloState = client.extract()

            // When the app is rendered collect the styles that are used inside it
            const markup = renderToString(sheet.collectStyles(<Root />))

            // Generate all the style tags so they can be rendered into the page
            const styleTags = sheet.getStyleTags()
            const helmet = Helmet.renderStatic()

            res.send(
                // prettier-ignore
                `<!doctype html>
    <html lang="" ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
    assets.client.css
        ? `<link rel="stylesheet" href="${assets.client.css}">`
        : ''
}
        ${
    process.env.NODE_ENV === 'production'
        ? `<script src="${assets.client.js}" defer></script>`
        : `<script src="${assets.client.js}" defer crossorigin></script>`
}
        <!-- Render the style tags gathered from the components into the DOM -->
        ${styleTags}
        <style>
        ${fontawesome.dom.css()}
        </style>
    </head>
    <body>
        <div id="root">${markup}</div>
           <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(
        initialApolloState
    ).replace(/</g, '\\u003c')}
        </script>
    </body>
</html>`
            )
        })
    })

export default server

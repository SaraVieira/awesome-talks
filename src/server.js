import App from './App'
import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { getDataFromTree } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import 'isomorphic-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { stateLink } from './client'

// const context = {}
// const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

// const server = express()
// server
//   .disable('x-powered-by')
//   .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
//   .get('/*', async (req, res) => {
//     const customRenderer = node => {
//       const App = (
//         <ApolloProvider client={client}>
//           <StaticRouter location={req.url} context={context}>
//             <ThemeProvider theme={theme}>{node}</ThemeProvider>
//           </StaticRouter>
//         </ApolloProvider>
//       )
//       return getDataFromTree(App).then(() => {
//         const initialApolloState = client.extract()
//         const html = renderToString(App)
//         return { html, initialApolloState }
//       })
//     }

//     // try {
//     const html = await render({
//       req,
//       res,
//       routes,
//       assets,
//       customRenderer,
//       document: Document
//     })
//     res.send(html)
//     // } catch (error) {
//     //   res.json(error)
//     // }
//   })

// export default server

const client = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([
        stateLink,
        new HttpLink({
            uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq'
        })
    ]),
    cache: new InMemoryCache()
})

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        const apolloState = getDataFromTree(App).then(() => {
            const initialApolloState = client.extract()
            return initialApolloState
        })
        // Create the server side style sheet
        const sheet = new ServerStyleSheet()
        // When the app is rendered collect the styles that are used inside it
        const markup = renderToString(sheet.collectStyles(<App />))
        // Generate all the style tags so they can be rendered into the page
        const styleTags = sheet.getStyleTags()

        res.send(`<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
            assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
        }
<div id="root"></div>
        ${
            process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${
                      assets.client.js
                  }" defer crossorigin></script>`
        }
        <!-- Render the style tags gathered from the components into the DOM -->
        ${styleTags}
    </head>
    <body>
        <div id="root">${markup}</div>
        ${apolloState()}
    </body>
</html>`)
    })

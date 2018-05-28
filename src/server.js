import React from 'react'
import express from 'express'
import { render } from '@jaredpalmer/after'
import { renderToString } from 'react-dom/server'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import routes from './routes'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { StaticRouter } from 'react-router'
import Document from './Document'
import 'isomorphic-fetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { stateLink } from './client'

const client = new ApolloClient({
  ssrMode: true,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq'
    })
  ]),
  cache: new InMemoryCache()
})
const context = {}
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const customRenderer = node => {
      const App = (
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={context}>
            <Document />
          </StaticRouter>
        </ApolloProvider>
      )
      return getDataFromTree(App).then(() => {
        const initialApolloState = client.extract()
        const html = renderToString(App)
        return { html, initialApolloState }
      })
    }

    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document
      })
      res.send(html)
    } catch (error) {
      res.json(error)
    }
  })

export default server

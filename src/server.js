import express from 'express'
import { render } from '@jaredpalmer/after'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import React from 'react'
import { StaticRouter } from 'react-router'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import routes from './routes'
import MyDocument from './Document'

import 'isomorphic-fetch'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'https://api.graphcms.com/simple/v1/cjhdcwrb98if90109o4pzawaq'
  }),
  cache: new InMemoryCache()
})

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const App = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={{}}>
          <MyDocument />
        </StaticRouter>
      </ApolloProvider>
    )
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        document: App
      })
      res.send(html)
    } catch (e) {
      console.log(e)
    }
  })

export default server

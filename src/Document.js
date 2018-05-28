import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { AfterRoot, AfterData } from '@jaredpalmer/after'

export default class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = await renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { assets, data, ...page, styleTags }
  }

  render() {
    const { helmet, assets, data, styleTags, initialApolloState } = this.props
    // Get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Amazing Tech Talks curated by the community ❤️"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/assets/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/assets/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/assets/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/assets/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/assets/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/assets/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/assets/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/assets/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/assets/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/assets/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/icons/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#337294" />
          <meta
            name="msapplication-TileImage"
            content="/assets/icons/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#337294" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@NikkitaFTW" />
          <meta name="twitter:title" content="Awesome Talks" />
          <meta
            name="twitter:description"
            content="Amazing Tech Talks curated by the community ❤️"
          />
          <meta
            name="twitter:image"
            content="https://file-iloqdynwox.now.sh/"
          />
          <meta name="twitter:image:alt" content="awesome talks" />

          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__APOLLO_STATE__=${JSON.stringify(
                initialApolloState
              ).replace(/</g, '\\u003c')};`
            }}
          />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    )
  }
}

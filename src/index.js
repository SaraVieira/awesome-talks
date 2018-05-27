import App from './App'
import { render } from 'preact'
import { default as renderToString } from 'preact-render-to-string'
import { ServerStyleSheet } from 'styled-components'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

if (typeof window === 'undefined') {
  /* eslint-disable */
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<App />))
  const styleTags = sheet.getStyleTags()
  /* eslint-enable */
}
if (typeof window !== 'undefined') {
  render(<App />, document.getElementById('root'))
  OfflinePluginRuntime.install()
}

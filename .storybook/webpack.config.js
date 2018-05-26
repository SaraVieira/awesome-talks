const webpack = require('webpack')
const path = require('path')

module.exports = (baseConfig, env, defaultConfig) => {
  // we are extending the base alias config here, adding preact as an alias
  defaultConfig.resolve.alias = Object.assign({}, defaultConfig.resolve.alias, {
    react: 'preact-compat',
    'react-dom': 'preact-compat'
  })

  // adding new plugins to the default config.
  defaultConfig.plugins.push(
    new webpack.ProvidePlugin({
      Component: ['preact', 'Component'],
      React: ['preact-compat']
    })
  )

  return defaultConfig
}

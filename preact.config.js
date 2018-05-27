import asyncPlugin from 'preact-cli-plugin-async'
const OfflinePlugin = require('offline-plugin')

export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  const plugins = config.plugins
  let babelConfig = rule.options
  babelConfig.presets.push([
    'env',
    {
      targets: {
        node: 'current'
      }
    }
  ])
  asyncPlugin(config)
  plugins.push(new OfflinePlugin())

  return config
}

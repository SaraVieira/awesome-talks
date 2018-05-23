import asyncPlugin from 'preact-cli-plugin-async'

export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
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
}

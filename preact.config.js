import asyncPlugin from 'preact-cli-plugin-async'

export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0]
  let babelConfig = rule.options

  babelConfig.plugins.push([
    'transform-react-jsx',
    {
      pragma: 'h',
      // eslint-disable-next-line
      pragmaFrag: '"strong"'
    }
  ])
  asyncPlugin(config)
}

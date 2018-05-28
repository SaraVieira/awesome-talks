const OfflinePlugin = require('offline-plugin')

module.exports = {
  modify: (config, env, webpack) => {
    const plugins = config.plugins

    plugins.push(new OfflinePlugin())

    return config
  }
}

const OfflinePlugin = require('offline-plugin')

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    const plugins = config.plugins

    if (target === 'web') plugins.push(new OfflinePlugin())

    return config
  }
}

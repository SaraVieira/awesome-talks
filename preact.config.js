import asyncPlugin from 'preact-cli-plugin-async'
const preactCliLodash = require('preact-cli-lodash')

export default (config, env, helpers) => {
  asyncPlugin(config)
  preactCliLodash(config)
}

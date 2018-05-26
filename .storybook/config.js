import { configure } from '@storybook/react'

const req = require.context('../src', true, /\w*story.js$/)
console.log(req.keys())
configure(() => {
  req.keys().forEach(filename => req(filename))
}, module)

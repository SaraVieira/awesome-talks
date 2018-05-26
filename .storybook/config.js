import { configure } from '@storybook/react'

function loadStories() {
  require('../src/stories/header.story.js')
  require('../src/stories/player.story.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)

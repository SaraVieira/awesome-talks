import { Component } from 'preact'

import Slider from './index'
import { storiesOf } from '@storybook/react'
import { forceCheck } from 'react-lazyload'

const sampleVideoData = [
  {
    speaker: [
      {
        name: 'Maja Wichrowska'
      }
    ],
    name: 'Do the Right (to Left) Thing: Directional Content in React',
    description:
      'In 2017, Airbnb supported 27 languages and had developed robust translation tools that made it easy to add more. We launched Croatian in May with little overhead beyond setting up the new domain and translating phrases. However, this was not true for all new languages; our next most requested language, Hebrew, posed a unique challenge. Because it reads right-to-left, the entire Hebrew UI must be flipped. Browsers only handle reversing the DOM structure, but styling and interactions must be coded manually.\n\nThis talk covers the journey of enabling right-to-left languages on airbnb.com. Recently, Airbnb has moved to a React frontend and away from Sass to a CSS-in-JS paradigm. We developed a performant and cross-browser solution for RTL that leveraged a CSS-in-JS abstraction layer to isolate the logic from our codebase. Our efforts led us most of the way to launching in Arabic and Hebrew while requiring little effort from our product engineers and with minimal disruption to their work.',
    tags: [
      {
        name: 'React',
        id: 'cjhg0axyh13460195gookni3c'
      },
      {
        name: 'Acessability',
        id: 'cjhg0qv5417gi0162qms6qvl0'
      }
    ],
    id: 'cjhddagqy0vy10153kjp6avt8',
    link: 'A_3BfONFRUc'
  },
  {
    speaker: [
      {
        name: 'Robin Christopherson'
      }
    ],
    name: 'Accessibility and inclusive design',
    description:
      'At Rocket Conference 2016, we invited Robin Christopherson from AbilityNet to talk about why accessibility is important on the web, and how helping people with disabilities will improve the user experience for all of your visitors.',
    tags: [
      {
        name: 'Design',
        id: 'cjhg0bwrj13o30151u7hi4mhv'
      },
      {
        name: 'Acessability',
        id: 'cjhg0qv5417gi0162qms6qvl0'
      }
    ],
    id: 'cjhhm6gpq0jn601007rb74bg2',
    link: 'g9Pbd3EyMp8'
  }
]

class SliderExample extends Component {
  componentDidMount() {
    forceCheck()
  }
  render() {
    return <Slider videos={sampleVideoData} />
  }
}

storiesOf('Slider', module).add('should render', () => <SliderExample />)
forceCheck()

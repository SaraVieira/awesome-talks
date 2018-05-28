import React from 'react'
import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Home'),
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    path: '/speakers',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Speakers'),
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    path: '/speaker/:speaker',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Speaker'),
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    path: '/category/:category',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Tag'),
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    path: '/categories',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Tags'),
      Placeholder: () => <div>...LOADING...</div>
    })
  },
  {
    path: '/favorites',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Favorites'),
      Placeholder: () => <div>...LOADING...</div>
    })
  }
]

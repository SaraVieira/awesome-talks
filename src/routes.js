import React from 'react'
import Loading from './Components/Styling/Loading'
import { asyncComponent } from '@jaredpalmer/after'

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Home'),
      Placeholder: () => <Loading />
    })
  },
  {
    path: '/speakers',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Speakers'),
      Placeholder: () => <Loading />
    })
  },
  {
    path: '/speaker/:speaker',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Speaker'),
      Placeholder: () => <Loading />
    })
  },
  {
    path: '/category/:category',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Tag'),
      Placeholder: () => <Loading />
    })
  },
  {
    path: '/categories',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Tags'),
      Placeholder: () => <Loading />
    })
  },
  {
    path: '/favorites',
    exact: true,
    component: asyncComponent({
      loader: () => import('./Pages/Favorites'),
      Placeholder: () => <Loading />
    })
  }
]

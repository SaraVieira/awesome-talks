import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Speakers from './Pages/Speakers'
import Speaker from './Pages/Speaker'
import Tags from './Pages/Tags'
import Tag from './Pages/Tag'
import Favorites from './Pages/Favorites'

import './Utils/global-styles'

export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favorites" component={Favorites} />
        <Route exact path="/categories" component={Tags} />
        <Route exact path="/category/:category" component={Tag} />
        <Route exact path="/speakers" component={Speakers} />
        <Route exact path="/speaker/:speaker" component={Speaker} />
    </Switch>
)

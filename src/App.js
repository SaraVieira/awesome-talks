import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'
import Speakers from './Pages/Speakers'
import Speaker from './Pages/Speaker'
import Tags from './Pages/Tags'
import Tag from './Pages/Tag'
import Favorites from './Pages/Favorites'

export default () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/categories" component={Tags} />
        <Route path="/category/:category" component={Tag} />
        <Route path="/speakers" component={Speakers} />
        <Route path="/speaker/:speaker" component={Speaker} />
    </div>
)

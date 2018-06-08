import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'react-styled-flexboxgrid'

import Favorites from './Pages/Favorites'
import Home from './Pages/Home'
import Speaker from './Pages/Speaker'
import Speakers from './Pages/Speakers'
import Tag from './Pages/Tag'
import Tags from './Pages/Tags'

import './Utils/global-styles'
import './Utils/icons'

function App() {
    return (
        <Grid>
            <Helmet
                defaultTitle="Awesome Talks"
                titleTemplate="Awesome Talks - %s"
            >
                <meta
                    name="description"
                    content="Amazing Tech Talks curated by the community ❤️"
                />

                {/* twitter tags */}
                <meta name="twitter:title" content="Awesome Talks" />
                <meta
                    name="twitter:description"
                    content="Amazing Tech Talks curated by the community ❤️"
                />
                <meta
                    name="twitter:image"
                    content="https://file-iloqdynwox.now.sh/"
                />
                <meta name="twitter:image:alt" content="awesome talks" />
            </Helmet>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/categories" component={Tags} />
                <Route exact path="/category/:category" component={Tag} />
                <Route exact path="/speakers" component={Speakers} />
                <Route exact path="/speaker/:speaker" component={Speaker} />
            </Switch>
        </Grid>
    )
}

export default App

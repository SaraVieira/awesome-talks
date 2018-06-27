import React from 'react'
import { Helmet } from 'react-helmet'

export default ({ name, link, description }) => (
    <Helmet>
        <title>Awesome Talks - {name}</title>
        <meta
            name="twitter:image"
            content={`https://img.youtube.com/vi/${link}/hqdefault.jpg`}
        />
        <meta name="twitter:title" content={`Awesome Talks - ${name}`} />
        <meta name="twitter:image:alt" content={name} />
        <meta name="description" content={description} />
        <meta
            name="twitter:description"
            content={`Amazing Tech Talk - ${name}`}
        />
    </Helmet>
)

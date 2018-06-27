import React from 'react'
import { Helmet } from 'react-helmet'

export default ({ name, photo }) => (
    <Helmet>
        <title>Awesome Talks - {name}</title>
        <meta name="twitter:title" content={`Awesome Talks - ${name}`} />
        <meta name="twitter:image" content={photo.url} />
        <meta name="twitter:image:alt" content={name} />
        <meta name="description" content={`Amazing Tech Talks by ${name}`} />
        <meta
            name="twitter:description"
            content={`Amazing Tech Talks by ${name}`}
        />
    </Helmet>
)

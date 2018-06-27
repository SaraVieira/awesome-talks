import React from 'react'
import { Helmet } from 'react-helmet'
import humanize from '../../Utils/strings'

export default ({ category }) => (
    <Helmet>
        <title>Awesome Talks - {category}</title>
        <meta
            name="description"
            content="Amazing Tech Talks curated by the community ❤️"
        />
        <meta
            name="twitter:title"
            content={`Awesome Talks - ${humanize(category)}`}
        />
        <meta
            name="twitter:description"
            content="Amazing Tech Talks curated by the community ❤️"
        />
        <meta name="twitter:image" content="https://file-iloqdynwox.now.sh/" />
        <meta name="twitter:image:alt" content="awesome talks" />
    </Helmet>
)

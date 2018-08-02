import RSS from 'rss'
import { createApolloFetch } from 'apollo-fetch'

const client = createApolloFetch({
    uri: 'https://api.graphcms.com/simple/v1/awesometalks'
})

const feed = new RSS({
    title: 'Awesome Talks',
    description: 'This is the RSS feed of Awesome talks',
    feed_url: 'https://awesometalks.party/feed',
    site_url: 'https://awesometalks.party',
    image_url: 'https://file-iloqdynwox.now.sh/',
    managingEditor: 'hey@iamsaravieira.com (Sara Vieira)',
    webMaster: 'hey@iamsaravieira.com (Sara Vieira)',
    copyright: `${new Date().getFullYear()} Sara Vieira`,
    language: 'en',
    pubDate: new Date(),
    ttl: 60
})

const query = `{
    talks: allVideoses(orderBy: updatedAt_DESC, filter: { isPublished: true }) {
            id
            speaker {
                name
            }
            description
            link
            name,
            tags {
                name
            }
        }
  }`

export default client({ query })
    .then(res => res.data.talks)
    .then(talks =>
        talks.forEach(({ id, name, link, speaker, description, tags }) => {
            return feed.item({
                guid: id,
                title: name,
                author: description,
                url: `https://youtube.com/watch?v=${link}`,
                speaker: speaker.name,
                categories: tags.map(({ name }) => name)
            })
        })
    )
    .then(() => feed.xml())
    .catch(e => console.log(e))

const { json } = require('micro')
var TwitterPackage = require('twitter')
require('dotenv').config()

var secret = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_KEY,
    access_token_secret: process.env.ACCESS_SECRET
}
var Twitter = new TwitterPackage(secret)

module.exports = async (req, res) => {
    const js = await json(req)
    const newVideo = js.data.Videos.node
    const speaker = newVideo.speaker[0]

    const twitter = speaker.twitter.includes('.com/')
        ? speaker.twitter.split('.com/')[1]
        : speaker.twitter

    const Tags = newVideo.tags.map(tag => `#${tag.name}`).join(' ')

    /**
     * {"speaker[0]":[{"name":"Heydon Pickering","twitter":"heydonworks"}],"name":"Writing Less Damned Code","tags":[{"name":"UX"},{"name":"Accessibility"}],"isPublished":true,"id":"cjhq1jcdk1uwg0104bdwylkrg","link":"tzfHlEFd2Fk"}
     *
     */

    if (newVideo.isPublished) {
        Twitter.post(
            'statuses/update',
            {
                status: `New Talk Release 🎉: ${newVideo.name} by the awesome ${
                    speaker.name
                }(@${twitter}) - https://youtube.com/watch?v=${newVideo.link}
${Tags}
            `
            },
            function(error, tweet, response) {
                if (error) {
                    console.log(error)
                }
                console.log(tweet)
            }
        )
    }

    return null
}

const { json } = require('micro')
const { request } = require('graphql-request')
const getDuration = require('./youtube')

const endpoint = 'https://api.graphcms.com/simple/v1/awesometalks'

const updateDuration = `
    mutation updateVideos($id: ID!, $duration: Int) {
        updateVideos(id: $id, duration: $duration) {
            id,
            duration
        }
    }
`

module.exports = async (req, res) => {
    const js = await json(req)
    const video = js.data.Videos.node

    try {
        const duration = await getDuration(video.link)

        try {
            const update = await request(endpoint, updateDuration, {
                id: video.id,
                duration
            })

            console.log(update)
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }

    return null
}

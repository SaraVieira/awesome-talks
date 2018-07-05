const { json } = require('micro')
const { request } = require('graphql-request')
const getYoutube = require('./youtube')
require('dotenv').config()
const endpoint = 'https://api.graphcms.com/simple/v1/awesometalks'

const updateDuration = `
    mutation updateVideos($id: ID!, $duration: Int, $year: Int, $likes: Int, $views: Int) {
        updateVideos(id: $id, duration: $duration, year: $year, likes: $likes, views: $views) {
            id,
            duration,
            year,
            views,
            likes
        }
    }
`
// const getVideos = `
//     query getVideos {
//         allVideoses {
//             id, link
//         }
//     }
// `
module.exports = async req => {
    // const allVideos = await request(endpoint, getVideos)
    // const videos = allVideos.allVideoses.reverse()
    // videos.map(async ({ link, id }) => {
    //     const youtube = await getYoutube(link)
    //     try {
    //         await request(endpoint, updateDuration, {
    //             id: id,
    //             duration: youtube.duration,
    //             year: youtube.year,
    //             likes: youtube.likes,
    //             views: youtube.views
    //         })
    //     } catch (e) {
    //         console.log(e)
    //     }
    // })
    const js = await json(req)
    const video = js.data.Videos.node
    try {
        const youtube = await getYoutube(video.link)
        try {
            const update = await request(endpoint, updateDuration, {
                id: video.id,
                duration: youtube.duration,
                year: youtube.year
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

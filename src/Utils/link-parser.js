export default link => {
    let match = false

    // allow only youtube related domains
    if (
        /https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be)/.test(
            link
        ) === false
    ) {
        return 'Only youtube links are allowed currently'
    }

    // multiple checks with fallbacks
    if (link.includes('v=') !== false) {
        return link.substr(link.indexOf('v=') + 2, 11)
    } else if (link.includes('embed/') !== false) {
        return link.substr(link.indexOf('embed/') + 6, 11)
    } else if ((match = link.match(/youtu\.be\/(.{11})(?:$|\?)/))) {
        return match[1]
    } else if (
        (match = link.match(/(?:\/(?:v|e)\/|video_id=)(.{11})(?:$|&|\?)/))
    ) {
        return match[1]
    }
    return 'Oops! invalid Link'
}

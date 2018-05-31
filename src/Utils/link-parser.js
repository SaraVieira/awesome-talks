import URL from 'url-parse'

export default link => {
    const url = new URL(link, true)
    if (url.host) {
        // normal url
        if (/youtube/.test(url.host)) {
            return url.query.v
        } else if (/youtu.be/.test(url.host) > -1) {
            return url.pathname.substr(1)
        } else {
            return null
        }
    } else {
        const splitId = link.split('=')
        return splitId.length === 2 ? splitId[1] : splitId[0]
    }
}

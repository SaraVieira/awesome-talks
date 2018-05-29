export default str => {
    var frags = str.split('-')
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
    }
    return frags.join(' ').toLowerCase()
}

const makeLink = (link, handle) =>
    `<a target="_blank" rel="noopener noreferrer" class="no-hover" href="${link.trim()}"><span>${
        handle ? handle.trim() : link.trim()
    }<span></a>`

export const urlify = text => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const handleRegex = /(^|[^@\w])@(\w{1,15})\b/g
    const withLinks = text.replace(urlRegex, url => makeLink(url))

    return withLinks.replace(handleRegex, handle =>
        makeLink(`http://twitter.com/${handle.trim()}`, handle)
    )
}

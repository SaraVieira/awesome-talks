const windowHeight =
  'innerHeight' in window
    ? window.innerHeight
    : document.documentElement.offsetHeight
const body = document.body
const html = document.documentElement
export const docHeight = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
)
export const windowBottom = windowHeight + window.pageYOffset

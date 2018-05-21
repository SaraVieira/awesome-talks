'use strict'
var precacheConfig = [
    [
      '/5fb83fbb222198e12e782065792887ad.svg',
      '5fb83fbb222198e12e782065792887ad'
    ],
    ['/assets/favicon.ico', 'a8f756565d6528a3450e605084c1f4b7'],
    [
      '/assets/icons/android-chrome-192x192.png',
      '2c9a4dbdb52973568136c39523e28ddb'
    ],
    [
      '/assets/icons/android-chrome-512x512.png',
      '8a59b0163aa1c1bcb40449a90a445989'
    ],
    [
      '/assets/icons/android-icon-144x144.png',
      '2fdc55f615e09f9065258895786931ec'
    ],
    [
      '/assets/icons/android-icon-192x192.png',
      '0ce955a5f99f57965da52c0d177f1738'
    ],
    [
      '/assets/icons/android-icon-36x36.png',
      '03ffa25cc54161557657554cd60f0f69'
    ],
    [
      '/assets/icons/android-icon-48x48.png',
      '5307caf939a02658956ddc0efd355130'
    ],
    [
      '/assets/icons/android-icon-72x72.png',
      '03ff7a80c24a971a8b630deb02f47dbe'
    ],
    [
      '/assets/icons/android-icon-96x96.png',
      '49532b0cad964fd69f5cd682cb7e114c'
    ],
    [
      '/assets/icons/apple-icon-114x114.png',
      'a128311070ed6a3c75aae1ec27115c63'
    ],
    [
      '/assets/icons/apple-icon-120x120.png',
      '48582757e5fd0c86b97bd9f9603dd01d'
    ],
    [
      '/assets/icons/apple-icon-144x144.png',
      '2fdc55f615e09f9065258895786931ec'
    ],
    [
      '/assets/icons/apple-icon-152x152.png',
      '5be763a08f0beddd96430a427222bd8a'
    ],
    [
      '/assets/icons/apple-icon-180x180.png',
      '879d53633132fefd222de998e033381d'
    ],
    ['/assets/icons/apple-icon-57x57.png', '3da531e40a4a3709311836211ec5b6c1'],
    ['/assets/icons/apple-icon-60x60.png', 'ba75444b239114c9d73d16465873269a'],
    ['/assets/icons/apple-icon-72x72.png', '03ff7a80c24a971a8b630deb02f47dbe'],
    ['/assets/icons/apple-icon-76x76.png', '1021dbbdc11ad775ce6dcf358e82ab6a'],
    [
      '/assets/icons/apple-icon-precomposed.png',
      'aa303ad9d0343898de4e4fcf874973ad'
    ],
    ['/assets/icons/apple-icon.png', 'aa303ad9d0343898de4e4fcf874973ad'],
    ['/assets/icons/apple-touch-icon.png', '1ad6132ab95219f1d36738d34b303348'],
    ['/assets/icons/browserconfig.xml', '653d077300a12f09a69caeea7a8947f8'],
    ['/assets/icons/favicon-16x16.png', '8c73a54367c584bd0b7e3e2462d5cdf3'],
    ['/assets/icons/favicon-32x32.png', '948637d5940f10fc3a39d9119e02f680'],
    ['/assets/icons/favicon-96x96.png', '49532b0cad964fd69f5cd682cb7e114c'],
    ['/assets/icons/favicon.ico', 'c8d01a93533811d7e28e46cd924fd911'],
    ['/assets/icons/ms-icon-144x144.png', '2fdc55f615e09f9065258895786931ec'],
    ['/assets/icons/ms-icon-310x310.png', 'aaca2f0337702b4a76d1a1bd98dea01a'],
    ['/assets/icons/ms-icon-70x70.png', 'a56c0e28532bd1090a5bba16e0db662f'],
    ['/assets/icons/mstile-150x150.png', '4f4bc9937f8d8d04bb7d61b979dcd14d'],
    ['/assets/logo.svg', '5fb83fbb222198e12e782065792887ad'],
    ['/bundle.a9064.js', '52dd829f5582fc8fc440389467170f2c'],
    ['/favicon.ico', 'a8f756565d6528a3450e605084c1f4b7'],
    ['/index.html', '4eacbccf6e1569380f1658ae4e3c87d5'],
    ['/manifest.json', '6bfd30c60b4d3f9852973dd4e8cb3a5d']
  ],
  cacheName =
    'sw-precache-v3-sw-precache-webpack-plugin-' +
    (self.registration ? self.registration.scope : ''),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, n) {
    var a = new URL(e)
    return '/' === a.pathname.slice(-1) && (a.pathname += n), a.toString()
  },
  cleanResponse = function(e) {
    return e.redirected
      ? ('body' in e ? Promise.resolve(e.body) : e.blob()).then(function(n) {
          return new Response(n, {
            headers: e.headers,
            status: e.status,
            statusText: e.statusText
          })
        })
      : Promise.resolve(e)
  },
  createCacheKey = function(e, n, a, s) {
    var c = new URL(e)
    return (
      (s && c.pathname.match(s)) ||
        (c.search +=
          (c.search ? '&' : '') +
          encodeURIComponent(n) +
          '=' +
          encodeURIComponent(a)),
      c.toString()
    )
  },
  isPathWhitelisted = function(e, n) {
    if (0 === e.length) return !0
    var a = new URL(n).pathname
    return e.some(function(e) {
      return a.match(e)
    })
  },
  stripIgnoredUrlParameters = function(e, n) {
    var a = new URL(e)
    return (
      (a.hash = ''),
      (a.search = a.search
        .slice(1)
        .split('&')
        .map(function(e) {
          return e.split('=')
        })
        .filter(function(e) {
          return n.every(function(n) {
            return !n.test(e[0])
          })
        })
        .map(function(e) {
          return e.join('=')
        })
        .join('&')),
      a.toString()
    )
  },
  hashParamName = '_sw-precache',
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var n = e[0],
        a = e[1],
        s = new URL(n, self.location),
        c = createCacheKey(s, hashParamName, a, !1)
      return [s.toString(), c]
    })
  )
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url
      })
    })
    .then(function(e) {
      return new Set(e)
    })
}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(e) {
        return setOfCachedUrls(e).then(function(n) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(a) {
              if (!n.has(a)) {
                var s = new Request(a, { credentials: 'same-origin' })
                return fetch(s).then(function(n) {
                  if (!n.ok)
                    throw new Error(
                      'Request for ' +
                        a +
                        ' returned a response with status ' +
                        n.status
                    )
                  return cleanResponse(n).then(function(n) {
                    return e.put(a, n)
                  })
                })
              }
            })
          )
        })
      })
      .then(function() {
        return self.skipWaiting()
      })
  )
}),
  self.addEventListener('activate', function(e) {
    var n = new Set(urlsToCacheKeys.values())
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(e) {
          return e.keys().then(function(a) {
            return Promise.all(
              a.map(function(a) {
                if (!n.has(a.url)) return e.delete(a)
              })
            )
          })
        })
        .then(function() {
          return self.clients.claim()
        })
    )
  }),
  self.addEventListener('fetch', function(e) {
    if ('GET' === e.request.method) {
      var n,
        a = stripIgnoredUrlParameters(
          e.request.url,
          ignoreUrlParametersMatching
        )
      ;(n = urlsToCacheKeys.has(a)) ||
        ((a = addDirectoryIndex(a, 'index.html')), (n = urlsToCacheKeys.has(a)))
      !n &&
        'navigate' === e.request.mode &&
        isPathWhitelisted(['^(?!\\/__).*'], e.request.url) &&
        ((a = new URL('index.html', self.location).toString()),
        (n = urlsToCacheKeys.has(a))),
        n &&
          e.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(a)).then(function(e) {
                  if (e) return e
                  throw Error(
                    'The cached response that was expected is missing.'
                  )
                })
              })
              .catch(function(n) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    e.request.url,
                    n
                  ),
                  fetch(e.request)
                )
              })
          )
    }
  })

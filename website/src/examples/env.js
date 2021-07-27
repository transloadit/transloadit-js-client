let companionEndpoint = 'http://localhost:3020'

if (location.hostname === 'uppy.io' || /--uppy\.netlify\.app$/.test(location.hostname)) {
  companionEndpoint = '//companion.uppy.io'
}

const COMPANION = companionEndpoint
module.exports = COMPANION

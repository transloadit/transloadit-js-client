const got = require('got').default

const Provider = require('../Provider')
const logger = require('../../logger')
const adaptData = require('./adapter')
const { ProviderApiError, ProviderAuthError } = require('../error')
const { prepareStream } = require('../../helpers/utils')

const BOX_FILES_FIELDS = 'id,modified_at,name,permissions,size,type'
const BOX_THUMBNAIL_SIZE = 256

const getClient = ({ token }) => got.extend({
  prefixUrl: 'https://api.box.com/2.0',
  headers: {
    authorization: `Bearer ${token}`,
  },
})

async function getUserInfo ({ token }) {
  return getClient({ token }).get('users/me', { responseType: 'json' }).json()
}

async function list ({ directory, query, token }) {
  const rootFolderID = '0'
  return getClient({ token }).get(`folders/${directory || rootFolderID}/items`, { searchParams: { fields: BOX_FILES_FIELDS, offset: query.cursor }, responseType: 'json' }).json()
}

/**
 * Adapter for API https://developer.box.com/reference/
 */
class Box extends Provider {
  constructor (options) {
    super(options)
    this.authProvider = Box.authProvider
    // needed for the thumbnails fetched via companion
    this.needsCookieAuth = true
  }

  static get authProvider () {
    return 'box'
  }

  /**
   * Lists files and folders from Box API
   *
   * @param {object} options
   * @param {string} options.directory
   * @param {any} options.query
   * @param {string} options.token
   * @param {unknown} options.companion
   */
  async list ({ directory, token, query, companion }) {
    return this.#withErrorHandling('provider.box.list.error', async () => {
      const [userInfo, files] = await Promise.all([
        getUserInfo({ token }),
        list({ directory, query, token }),
      ])

      return adaptData(files, userInfo.login, companion)
    })
  }

  async download ({ id, token }) {
    return this.#withErrorHandling('provider.box.download.error', async () => {
      const stream = getClient({ token }).stream.get(`files/${id}/content`, { responseType: 'json' })

      await prepareStream(stream)
      return { stream }
    })
  }

  async thumbnail ({ id, token }) {
    return this.#withErrorHandling('provider.box.thumbnail.error', async () => {
      const extension = 'jpg' // you can set this to png to more easily reproduce http 202 retry-after

      // From box API docs:
      // Sometimes generating a thumbnail can take a few seconds.
      // In these situations the API returns a Location-header pointing to a placeholder graphic
      // for this file type.
      // The placeholder graphic can be used in a user interface until the thumbnail generation has completed.
      // The Retry-After-header indicates when to the thumbnail will be ready.
      // At that time, retry this endpoint to retrieve the thumbnail.
      //
      // This can be reproduced more easily by changing extension to png and trying on a newly uploaded image
      const stream = getClient({ token }).stream.get(`files/${id}/thumbnail.${extension}`, {
        searchParams: { max_height: BOX_THUMBNAIL_SIZE, max_width: BOX_THUMBNAIL_SIZE },
        responseType: 'json',
      })

      await prepareStream(stream)
      return { stream }
    })
  }

  async size ({ id, token }) {
    return this.#withErrorHandling('provider.box.size.error', async () => {
      const { size } = await getClient({ token }).get(`files/${id}`, { responseType: 'json' }).json()
      return parseInt(size, 10)
    })
  }

  logout ({ companion, token }) {
    return this.#withErrorHandling('provider.box.logout.error', async () => {
      const { key, secret } = companion.options.providerOptions.box
      await getClient({ token }).post('oauth2/revoke', {
        prefixUrl: 'https://api.box.com',
        form: {
          client_id: key,
          client_secret: secret,
          token,
        },
        responseType: 'json',
      })

      return { revoked: true }
    })
  }

  async #withErrorHandling (tag, fn) {
    try {
      return await fn()
    } catch (err) {
      const err2 = this.#convertError(err)
      logger.error(err2, tag)
      throw err2
    }
  }

  #convertError (err) {
    const { response } = err
    if (response) {
      const fallbackMessage = `request to ${this.authProvider} returned ${response.statusCode}`
      let errMsg
      if (typeof response.body === 'object' && response.body.message) errMsg = response.body.message
      else if (typeof response.body === 'string') errMsg = response.body
      else errMsg = fallbackMessage

      return response.statusCode === 401 ? new ProviderAuthError() : new ProviderApiError(errMsg, response.statusCode)
    }

    return err
  }
}

module.exports = Box

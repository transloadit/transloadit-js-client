const express = require('express')

const { startDownUpload } = require('../helpers/upload')
const { prepareStream } = require('../helpers/utils')
const { validateURL } = require('../helpers/request')
const { getURLMeta, getProtectedGot } = require('../helpers/request')
const logger = require('../logger')

/**
 * @callback downloadCallback
 * @param {Error} err
 * @param {string | Buffer | Buffer[]} chunk
 */

/**
 * Downloads the content in the specified url, and passes the data
 * to the callback chunk by chunk.
 *
 * @param {string} url
 * @param {boolean} allowLocalIPs
 * @param {string} traceId
 * @returns {Promise}
 */
const downloadURL = async (url, allowLocalIPs, traceId) => {
  try {
    const protectedGot = await getProtectedGot({ allowLocalIPs })
    const stream = protectedGot.stream.get(url, { responseType: 'json' })
    const { size } = await prepareStream(stream)
    return { stream, size }
  } catch (err) {
    logger.error(err, 'controller.url.download.error', traceId)
    throw err
  }
}

/**
 * Fetches the size and content type of a URL
 *
 * @param {object} req expressJS request object
 * @param {object} res expressJS response object
 */
const meta = async (req, res) => {
  try {
    logger.debug('URL file import handler running', null, req.id)
    const { allowLocalUrls } = req.companion.options
    if (!validateURL(req.body.url, allowLocalUrls)) {
      logger.debug('Invalid request body detected. Exiting url meta handler.', null, req.id)
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const urlMeta = await getURLMeta(req.body.url, allowLocalUrls)
    return res.json(urlMeta)
  } catch (err) {
    logger.error(err, 'controller.url.meta.error', req.id)
    return res.status(err.status || 500).json({ message: 'failed to fetch URL metadata' })
  }
}

/**
 * Handles the reques of import a file from a remote URL, and then
 * subsequently uploading it to the specified destination.
 *
 * @param {object} req expressJS request object
 * @param {object} res expressJS response object
 */
const get = async (req, res) => {
  logger.debug('URL file import handler running', null, req.id)
  const { allowLocalUrls } = req.companion.options
  if (!validateURL(req.body.url, allowLocalUrls)) {
    logger.debug('Invalid request body detected. Exiting url import handler.', null, req.id)
    res.status(400).json({ error: 'Invalid request body' })
    return
  }

  async function getSize () {
    const { size } = await getURLMeta(req.body.url, allowLocalUrls)
    return size
  }

  const download = () => downloadURL(req.body.url, allowLocalUrls, req.id)

  try {
    await startDownUpload({ req, res, getSize, download })
  } catch (err) {
    logger.error(err, 'controller.url.error', req.id)
    res.status(err.status || 500).json({ message: 'failed to fetch URL' })
  }
}

module.exports = () => express.Router()
  .post('/meta', express.json(), meta)
  .post('/get', express.json(), get)

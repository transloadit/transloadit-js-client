const { UIPlugin } = require('@uppy/core')
const { RateLimitedQueue } = require('@uppy/utils/lib/RateLimitedQueue')
const Compressor = require('compressorjs/dist/compressor.common.js')
const locale = require('./locale')

module.exports = class ImageCompressor extends UIPlugin {
  #RateLimitedQueue

  constructor (uppy, opts) {
    super(uppy, opts)
    this.id = this.opts.id || 'ImageCompressor'
    this.type = 'modifier'

    this.defaultLocale = locale

    const defaultOptions = {
      quality: 0.6,
      limit: 10,
    }

    this.opts = { ...defaultOptions, ...opts }

    this.#RateLimitedQueue = new RateLimitedQueue(this.opts.limit)

    this.i18nInit()

    this.prepareUpload = this.prepareUpload.bind(this)
    this.compress = this.compress.bind(this)
  }

  compress (blob) {
    return new Promise((resolve, reject) => {
      /* eslint-disable no-new */
      new Compressor(blob, {
        ...this.opts,
        success: resolve,
        error: reject,
      })
    })
  }

  async prepareUpload (fileIDs) {
    const compressAndApplyResult = this.#RateLimitedQueue.wrapPromiseFunction(
      async (file) => {
        try {
          const compressedBlob = await this.compress(file.data)
          this.uppy.log(`[Image Compressor] Image ${file.id} size before/after compression: ${file.data.size} / ${compressedBlob.size}`)
          this.uppy.setFileState(file.id, {
            data: compressedBlob,
            size: compressedBlob.size,
          })
        } catch (err) {
          this.uppy.log(`[Image Compressor] Failed to compress ${file.id}:`, 'warning')
          this.uppy.log(err, 'warning')
        }
      },
    )

    const promises = fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID)
      this.uppy.emit('preprocess-progress', file, {
        mode: 'indeterminate',
        message: this.i18n('compressingImages'),
      })

      if (!file.type.startsWith('image/')) {
        return Promise.resolve()
      }

      return compressAndApplyResult(file)
    })

    // Why emit `preprocess-complete` for all files at once, instead of
    // above when each is processed?
    // Because it leads to StatusBar showing a weird “upload 6 files” button,
    // while waiting for all the files to complete pre-processing.
    await Promise.all(promises)

    for (const fileID of fileIDs) {
      const file = this.uppy.getFile(fileID)
      this.uppy.emit('preprocess-complete', file)
    }
  }

  install () {
    this.uppy.addPreProcessor(this.prepareUpload)
  }

  uninstall () {
    this.uppy.removePreProcessor(this.prepareUpload)
  }
}

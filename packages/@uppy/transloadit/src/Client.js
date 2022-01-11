const fetchWithNetworkError = require('@uppy/utils/lib/fetchWithNetworkError')
const NetworkError = require('@uppy/utils/lib/NetworkError')

function fetchJSON (...args) {
  return fetchWithNetworkError(...args).then(response => {
    if (response.status === 429) {
      // If the server asks the client to rate limit, reschedule the request 5s later.
      return new Promise((resolve, reject) => {
        setTimeout(() => fetchJSON(...args).then(resolve, reject), 5_000)
      })
    }

    if (!response.ok) {
      return Promise.reject(new NetworkError(response.statusText))
    }

    return response.json()
  })
}

/**
 * A Barebones HTTP API client for Transloadit.
 */
module.exports = class Client {
  #headers = {}

  constructor (opts = {}) {
    this.opts = opts

    if (this.opts.client != null) {
      this.#headers['Transloadit-Client'] = this.opts.client
    }
  }

  /**
   * Create a new assembly.
   *
   * @param {object} options
   * @param {string|object} options.params
   * @param {object} options.fields
   * @param {string} options.signature
   * @param {number} options.expectedFiles
   */
  createAssembly ({
    params,
    fields,
    signature,
    expectedFiles,
  }) {
    const data = new FormData()
    data.append('params', typeof params === 'string'
      ? params
      : JSON.stringify(params))
    if (signature) {
      data.append('signature', signature)
    }

    Object.keys(fields).forEach((key) => {
      data.append(key, fields[key])
    })
    data.append('num_expected_upload_files', expectedFiles)

    const url = new URL('/assemblies', `${this.opts.service}`).href
    return fetchJSON(url, {
      method: 'post',
      headers: this.#headers,
      body: data,
    })
      .then((assembly) => {
        if (assembly.error) {
          const error = new Error(assembly.error)
          error.details = assembly.message
          error.assembly = assembly
          if (assembly.assembly_id) {
            error.details += ` Assembly ID: ${assembly.assembly_id}`
          }
          throw error
        }

        return assembly
      })
      .catch((err) => this.#reportError(err, { url, type: 'API_ERROR' }))
  }

  /**
   * Reserve resources for a file in an Assembly. Then addFile can be used later.
   *
   * @param {object} assembly
   * @param {UppyFile} file
   */
  reserveFile (assembly, file) {
    const size = encodeURIComponent(file.size)
    const url = `${assembly.assembly_ssl_url}/reserve_file?size=${size}`
    return fetchJSON(url, { method: 'post', headers: this.#headers })
      .catch((err) => this.#reportError(err, { assembly, file, url, type: 'API_ERROR' }))
  }

  /**
   * Import a remote file to an Assembly.
   *
   * @param {object} assembly
   * @param {UppyFile} file
   */
  addFile (assembly, file) {
    if (!file.uploadURL) {
      return Promise.reject(new Error('File does not have an `uploadURL`.'))
    }
    const size = encodeURIComponent(file.size)
    const uploadUrl = encodeURIComponent(file.uploadURL)
    const filename = encodeURIComponent(file.name)
    const fieldname = 'file'

    const qs = `size=${size}&filename=${filename}&fieldname=${fieldname}&s3Url=${uploadUrl}`
    const url = `${assembly.assembly_ssl_url}/add_file?${qs}`
    return fetchJSON(url, { method: 'post', headers: this.#headers })
      .catch((err) => this.#reportError(err, { assembly, file, url, type: 'API_ERROR' }))
  }

  /**
   * Cancel a running Assembly.
   *
   * @param {object} assembly
   */
  cancelAssembly (assembly) {
    const url = assembly.assembly_ssl_url
    return fetchJSON(url, { method: 'delete', headers: this.#headers })
      .catch((err) => this.#reportError(err, { url, type: 'API_ERROR' }))
  }

  /**
   * Get the current status for an assembly.
   *
   * @param {string} url The status endpoint of the assembly.
   */
  getAssemblyStatus (url) {
    return fetchJSON(url, { headers: this.#headers })
      .catch((err) => this.#reportError(err, { url, type: 'STATUS_ERROR' }))
  }

  submitError (err, { endpoint, instance, assembly } = {}) {
    const message = err.details
      ? `${err.message} (${err.details})`
      : err.message

    return fetchJSON('https://transloaditstatus.com/client_error', {
      method: 'post',
      body: JSON.stringify({
        endpoint,
        instance,
        assembly_id: assembly,
        agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        client: this.opts.client,
        error: message,
      }),
    })
  }

  #reportError = (err, params) => {
    if (this.opts.errorReporting === false) {
      throw err
    }

    const opts = {
      type: params.type,
    }
    if (params.assembly) {
      opts.assembly = params.assembly.assembly_id
      opts.instance = params.assembly.instance
    }
    if (params.url) {
      opts.endpoint = params.url
    }

    this.submitError(err, opts).catch(() => {
      // not much we can do then is there
    })

    throw err
  }
}

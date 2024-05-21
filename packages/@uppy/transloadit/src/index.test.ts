import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { once } from 'node:events'
import { describe, expect, it } from 'vitest'
import Core from '@uppy/core'
import nock from 'nock'
import Transloadit from './index.ts'
import 'whatwg-fetch'

// pause/resume/cancel
// clean up (no polling) on cancel all and emit assembly-cancelled
// clean up after removing all files after upload before finish
// should create assembly if there is still one file to upload
// should complete upload if one gets cancelled mid-flight
// should not emit error if upload is cancelled right away

const defaultReplyHeaders = {
  'access-control-allow-credentials': 'true',
  'access-control-allow-headers': '*',
  'access-control-allow-method': 'GET,DELETE,GET,OPTIONS,PATCH,POST,PUT',
  'access-control-allow-origin': '*',
}

describe('Transloadit', () => {
  it('Does not leave lingering progress if getAssemblyOptions fails', () => {
    const error = new Error('expected failure')
    const uppy = new Core()
    uppy.use(Transloadit, {
      assemblyOptions() {
        return Promise.reject(error)
      },
    })

    uppy.addFile({
      source: 'jest',
      name: 'abc',
      data: new Blob(),
    })

    return uppy
      .upload()
      .then(() => {
        throw new Error('Should not have succeeded')
      })
      .catch((err) => {
        const fileID = Object.keys(uppy.getState().files)[0]

        expect(err).toBe(error)
        expect(uppy.getFile(fileID).progress.uploadStarted).toBe(null)
      })
  })

  it('Does not leave lingering progress if creating assembly fails', () => {
    const uppy = new Core().use(Transloadit, {
      assemblyOptions: {
        params: {
          auth: { key: 'some auth key string' },
          template_id: 'some template id string',
        },
      },
    })

    // @ts-expect-error is allowed
    uppy.getPlugin('Transloadit').client.createAssembly = () =>
      Promise.reject(new Error('VIDEO_ENCODE_VALIDATION'))

    uppy.addFile({
      source: 'jest',
      name: 'abc',
      data: new Blob(),
    })

    return uppy.upload().then(
      () => {
        throw new Error('Should not have succeeded')
      },
      (err) => {
        const fileID = Object.keys(uppy.getState().files)[0]

        expect(err.message).toBe(
          'Transloadit: Could not create Assembly: VIDEO_ENCODE_VALIDATION',
        )
        expect(uppy.getFile(fileID).progress.uploadStarted).toBe(null)
      },
    )
  })

  it.only('should clean up after receiving cancel-all', async () => {
    const service = 'https://api2.transloadit.com'
    const uppy = new Core().use(Transloadit, {
      service,
      assemblyOptions: {
        params: {
          auth: { key: 'some auth key string' },
          template_id: 'some template id string',
        },
      },
    })

    const scope = nock(service).defaultReplyHeaders(defaultReplyHeaders)

    scope.post('/assemblies').reply(200, {
      assembly_url:
        'http://api2.mosopa.transloadit.com/assemblies/df391110390343e08a06ba37d07e85e1',
      assembly_ssl_url:
        'https://api2-mosopa.transloadit.com/assemblies/df391110390343e08a06ba37d07e85e1',
      uppyserver_url: 'https://api2-mosopa.transloadit.com/companion/',
      companion_url: 'https://api2-mosopa.transloadit.com/companion/',
      websocket_url: 'https://api2-mosopa.transloadit.com/ws20175',
      update_stream_url:
        'https://api2-mosopa.transloadit.com/ws20175?assembly=df391110390343e08a06ba37d07e85e1',
      tus_url: 'https://api2-mosopa.transloadit.com/resumable/files/',
    })

    const scope2 = nock(
      'https://api2-mosopa.transloadit.com',
    ).defaultReplyHeaders(defaultReplyHeaders)

    scope2.post('/resumable/files/').reply(201, undefined, {
      Location:
        'https://api2-mosopa.transloadit.com/resumable/files/39c94eb0a4caf2c9e4c63213da74445d',
    })

    scope2
      .options('/resumable/files/39c94eb0a4caf2c9e4c63213da74445d')
      .reply(200, undefined, {
        'tus-extension':
          'creation,creation-with-upload,termination,concatenation,creation-defer-length',
        'tus-max-size': '128849018880',
        'tus-resumable': '1.0.0',
        'tus-version': '1.0.0',
      })

    scope2
      .patch('/resumable/files/39c94eb0a4caf2c9e4c63213da74445d')
      .delay(500)
      .reply(204, undefined, { 'tus-resumable': '1.0.0' })

    scope2.options('/assemblies/df391110390343e08a06ba37d07e85e1').reply(204)
    scope2.get('/assemblies/df391110390343e08a06ba37d07e85e1').reply(200, {
      ok: 'ASSEMBLY_COMPLETED',
      http_code: 200,
      message: 'The Assembly was successfully completed.',
      assembly_id: 'df391110390343e08a06ba37d07e85e1',
    })

    const deleteScope = nock(
      'https://api2-mosopa.transloadit.com',
    ).defaultReplyHeaders(defaultReplyHeaders)
    deleteScope
      .delete('/assemblies/df391110390343e08a06ba37d07e85e1')
      .reply(204)

    const id = uppy.addFile({
      source: 'test',
      name: 'foo',
      data: Buffer.alloc(1024),
    })

    try {
      // setTimeout(() => {
      //   uppy.removeFile(id)
      // }, 250)
      const result = await uppy.upload()
      console.log(result)
    } finally {
      scope.done()
      // scope2.done()
    }
  })

  // For some reason this test doesn't pass on CI
  it('Can start an assembly with no files and no fields', async () => {
    const server = createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')
      res.setHeader('Content-Type', 'application/json')
      res.end('{"websocket_url":"https://example.com"}')
    }).listen()

    await once(server, 'listening')
    const uppy = new Core({ autoProceed: false })
    const { port } = server.address() as AddressInfo

    uppy.use(Transloadit, {
      service: `http://localhost:${port}`,
      alwaysRunAssembly: true,
      assemblyOptions: {
        params: {
          auth: { key: 'some auth key string' },
          template_id: 'some template id string',
        },
      },
    })

    await uppy.upload()
    server.closeAllConnections()
    await new Promise((resolve) => server.close(resolve))
  })

  // For some reason this test doesn't pass on CI
  it('Can start an assembly with no files and some fields', async () => {
    const server = createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')
      res.setHeader('Content-Type', 'application/json')
      res.end('{"websocket_url":"https://example.com"}')
    }).listen()

    await once(server, 'listening')
    const uppy = new Core({ autoProceed: false })
    const { port } = server.address() as AddressInfo

    uppy.use(Transloadit, {
      service: `http://localhost:${port}`,
      alwaysRunAssembly: true,
      assemblyOptions: {
        params: {
          auth: { key: 'some auth key string' },
          template_id: 'some template id string',
        },
        fields: ['hasOwnProperty'],
      },
    })

    await uppy.upload()
    server.closeAllConnections()
    await new Promise((resolve) => server.close(resolve))
  })
})

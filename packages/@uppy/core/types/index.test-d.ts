import { expectError, expectType } from 'tsd'
import Uppy = require('../')
import DefaultStore = require('@uppy/store-default')

{
  const uppy = Uppy()
  uppy.addFile({
    data: new Blob([new ArrayBuffer(1024)], {
      type: 'application/octet-stream'
    })
  })

  uppy.upload().then(result => {
    expectType<Uppy.UploadedUppyFile<{}, {}>>(result.successful[0])
    expectType<Uppy.FailedUppyFile<{}, {}>>(result.failed[0])
  })
}

{
  const store = DefaultStore()
  const uppy = Uppy({ store })
}

{
  const uppy = Uppy()
  // this doesn't exist but type checking works anyway :)
  const f = uppy.getFile('virtual')
  if (f && f.progress && f.progress.uploadStarted === null) {
    f.progress.uploadStarted = Date.now()
  }

  if (f && f.response && f.response.status === 200) {
    expectType(f.response.body)
  }
  expectType<number>(f.response!.status)
}

{
  type Meta = {}
  type ResponseBody = {
    averageColor: string
  }
  const uppy = Uppy()
  const f = uppy.getFile<Meta, ResponseBody>('virtual')!
  expectType<ResponseBody>(f.response!.body)
}

{
  const uppy = Uppy()
  uppy.addFile({
    name: 'empty.json',
    data: new Blob(['null'], { type: 'application/json' }),
    meta: { path: 'path/to/file' }
  })
}

{
  interface SomeOptions extends Uppy.PluginOptions {
    types: 'are checked'
  }
  class SomePlugin extends Uppy.Plugin<SomeOptions> {}
  const typedUppy = Uppy()

  expectError(typedUppy.use(SomePlugin, { types: 'error' }))

  typedUppy.use(SomePlugin, { types: 'are checked' })
}

{
  const uppy = new Uppy()
  // can emit events with internal event types
  uppy.emit('upload')
  uppy.emit('complete', () => {})
  uppy.emit('error', () => {})

  // can emit events with custom event types
  uppy.emit('dashboard:modal-closed', () => {})

  // can register listners for internal events
  uppy.on('upload', () => {})
  uppy.on('complete', () => {})
  uppy.on('error', () => {})

  // can register listners on custom events
  uppy.on('dashboard:modal-closed', () => {})
}

{
  const uppy = new Uppy()
  uppy.setOptions({
    restrictions: {
      allowedFileTypes: ['.png']
    }
  })
  expectError(uppy.setOptions({ restrictions: false }))
  expectError(uppy.setOptions({ unknownKey: false }))
}

{
  interface TestOptions extends Uppy.PluginOptions {
    testOption: string
  }
  class TestPlugin extends Uppy.Plugin<TestOptions> {}

  const strict = Uppy().use(TestPlugin, { testOption: 'hello' })
  ;(strict.getPlugin('TestPlugin') as TestPlugin).setOptions({ testOption: 'world' })
  expectError((strict.getPlugin('TestPlugin') as TestPlugin).setOptions({ testOption: 0 }))
  expectError((strict.getPlugin('TestPlugin') as TestPlugin).setOptions({ unknownKey: false }))
}

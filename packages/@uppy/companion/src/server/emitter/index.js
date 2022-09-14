const nodeEmitter = require('./default-emitter')
const redisEmitter = require('./redis-emitter')

let emitter

/**
 * Singleton event emitter that is shared between modules throughout the lifetime of the server.
 * Used to transmit events (such as progress, upload completion) from controllers,
 * such as the Google Drive 'get' controller, along to the client.
 */
module.exports = (redisUrl, redisPubSubScope) => {
  if (!emitter) {
    emitter = redisUrl ? redisEmitter(redisUrl, redisPubSubScope) : nodeEmitter()
    Object.assign(emitter, { __TEST__: Math.random() })
  }
  return emitter
}

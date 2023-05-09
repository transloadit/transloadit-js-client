const { errorToResponse } = require('../provider/error')

async function list ({ query, params, companion }, res, next) {
  const { accessToken } = companion.providerTokens

  try {
    const data = await companion.provider.list({ companion, token: accessToken, directory: params.id, query })
    res.json(data)
  } catch (err) {
    const errResp = errorToResponse(err)
    if (errResp) {
      res.status(errResp.code).json({ message: errResp.message })
      return
    }
    next(err)
  }
}

module.exports = list

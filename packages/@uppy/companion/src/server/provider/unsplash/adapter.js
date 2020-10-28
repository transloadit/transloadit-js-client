const querystring = require('querystring')

exports.isFolder = (item) => {
  return false
}

exports.getItemIcon = (item) => {
  return item.urls.thumb
}

exports.getItemSubList = (item) => {
  return item.results
}

exports.getItemName = (item) => {
  const description = item.description || item.alt_description
  if (description) {
    return description.replace(/^(.{30})..+/, '$1...') + '.jpg'
  }
}

exports.getMimeType = (item) => {
  return 'image/jpeg'
}

exports.getItemId = (item) => {
  return `${item.id}`
}

exports.getItemRequestPath = (item) => {
  return `${item.id}`
}

exports.getItemModifiedDate = (item) => {
  return item.created_at
}

exports.getItemThumbnailUrl = (item) => {
  return item.urls.thumb
}

exports.getNextPageQuery = (currentQuery) => {
  const newCursor = parseInt(currentQuery.cursor || 1) + 1
  const query = {
    ...currentQuery,
    cursor: newCursor
  }

  delete query.q
  return querystring.stringify(query)
}

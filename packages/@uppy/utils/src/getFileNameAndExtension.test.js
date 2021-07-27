const getFileNameAndExtension = require('./getFileNameAndExtension')

describe('getFileNameAndExtension', () => {
  it('should return the filename and extension as an array', () => {
    expect(getFileNameAndExtension('fsdfjodsuf23rfw.jpg')).toEqual({
      name: 'fsdfjodsuf23rfw',
      extension: 'jpg',
    })
  })

  it('should handle invalid filenames', () => {
    expect(getFileNameAndExtension('fsdfjodsuf23rfw')).toEqual({
      name: 'fsdfjodsuf23rfw',
      extension: undefined,
    })
  })
})

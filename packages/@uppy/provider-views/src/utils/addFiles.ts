import type { UnknownPlugin } from '@uppy/core'
import type {
  CompanionClientProvider,
  CompanionClientSearchProvider,
} from '@uppy/utils/lib/CompanionClientProvider'
import type { CompanionFile } from '@uppy/utils/lib/CompanionFile'
import type { Meta, Body, TagFile } from '@uppy/utils/lib/UppyFile'
import { getSafeFileId } from '@uppy/utils/lib/generateFileID'
import getTagFile from './getTagFile'

const addFiles = <M extends Meta, B extends Body>(
  companionFiles: CompanionFile[],
  plugin: UnknownPlugin<M, B>,
  provider: CompanionClientProvider | CompanionClientSearchProvider,
) => {
  const tagFiles: TagFile<M>[] = companionFiles.map((f) =>
    getTagFile<M, B>(f, plugin, provider),
  )

  const filesToAdd: TagFile<M>[] = []
  const filesAlreadyAdded: TagFile<M>[] = []
  tagFiles.forEach((tagFile) => {
    if (plugin.uppy.checkIfFileAlreadyExists(getSafeFileId(tagFile))) {
      filesAlreadyAdded.push(tagFile)
    } else {
      filesToAdd.push(tagFile)
    }
  })

  if (filesToAdd.length > 0) {
    plugin.uppy.info(
      plugin.uppy.i18n('addedNumFiles', { numFiles: filesToAdd.length }),
    )
  }
  if (filesAlreadyAdded.length > 0) {
    plugin.uppy.info(
      `Not adding ${filesAlreadyAdded.length} files because they already exist`,
    )
  }
  plugin.uppy.addFiles(filesToAdd)
}

export default addFiles

/* eslint-disable no-param-reassign */
import type {
  PartialTree,
  PartialTreeFile,
  PartialTreeFolder,
  PartialTreeFolderNode,
  PartialTreeId,
} from '@uppy/core/lib/Uppy'
import clone from './clone'

/*
  FROM        | TO

  root        |  root
    folder    |    folder
    folder ✅︎  |    folder ✅︎
      file    |      file ✅︎
      file    |      file ✅︎
      folder  |      folder ✅︎
        file  |        file ✅︎
    file      |    file
    file      |    file
*/
const percolateDown = (
  tree: PartialTree,
  id: PartialTreeId,
  shouldMarkAsChecked: boolean,
) => {
  const children = tree.filter(
    (item) => item.type !== 'root' && item.parentId === id,
  ) as (PartialTreeFolderNode | PartialTreeFile)[]
  children.forEach((item) => {
    item.status =
      shouldMarkAsChecked && !(item.type === 'file' && item.restrictionError) ?
        'checked'
      : 'unchecked'
    percolateDown(tree, item.id, shouldMarkAsChecked)
  })
}

/*
  FROM         | TO

  root         |  root
    folder     |    folder
    folder     |    folder [▬] ('partial' status)
      file     |      file
      folder   |      folder ✅︎
        file ✅︎ |       file ✅︎
    file       |    file
    file       |    file
*/
const percolateUp = (tree: PartialTree, id: PartialTreeId) => {
  const folder = tree.find((item) => item.id === id) as PartialTreeFolder
  if (folder.type === 'root') return

  const validChildren = tree.filter(
    (item) =>
      // is a child
      item.type !== 'root' &&
      item.parentId === folder.id &&
      // does pass validations
      !(item.type === 'file' && item.restrictionError),
  ) as (PartialTreeFile | PartialTreeFolderNode)[]

  const areAllChildrenChecked = validChildren.every(
    (item) => item.status === 'checked',
  )
  const areAllChildrenUnchecked = validChildren.every(
    (item) => item.status === 'unchecked',
  )

  if (areAllChildrenChecked) {
    folder.status = 'checked'
  } else if (areAllChildrenUnchecked) {
    folder.status = 'unchecked'
  } else {
    folder.status = 'partial'
  }

  percolateUp(tree, folder.parentId)
}

const afterToggleCheckbox = (
  oldPartialTree: PartialTree,
  clickedRange: string[],
): PartialTree => {
  const newPartialTree: PartialTree = clone(oldPartialTree)

  // We checked two or more items
  if (clickedRange.length >= 2) {
    const newlyCheckedItems = newPartialTree.filter(
      (item) => item.type !== 'root' && clickedRange.includes(item.id),
    ) as (PartialTreeFile | PartialTreeFolderNode)[]

    newlyCheckedItems.forEach((item) => {
      if (item.type === 'file') {
        item.status = item.restrictionError ? 'unchecked' : 'checked'
      } else {
        item.status = 'checked'
      }
    })

    newlyCheckedItems.forEach((item) => {
      percolateDown(newPartialTree, item.id, true)
    })
    percolateUp(newPartialTree, newlyCheckedItems[0].parentId)
    // We checked exactly one item
  } else {
    const clickedItem = newPartialTree.find(
      (item) => item.id === clickedRange[0],
    ) as PartialTreeFile | PartialTreeFolderNode
    clickedItem.status =
      clickedItem.status === 'checked' ? 'unchecked' : 'checked'
    percolateDown(
      newPartialTree,
      clickedItem.id,
      clickedItem.status === 'checked',
    )
    percolateUp(newPartialTree, clickedItem.parentId)
  }

  return newPartialTree
}

export default afterToggleCheckbox

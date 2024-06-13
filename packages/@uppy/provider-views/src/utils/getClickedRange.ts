import type {
  PartialTreeFile,
  PartialTreeFolderNode,
} from '@uppy/core/lib/Uppy'

// Shift-clicking selects a single consecutive list of items
// starting at the previous click.
const getClickedRange = (
  clickedId: string,
  displayedPartialTree: (PartialTreeFolderNode | PartialTreeFile)[],
  isShiftKeyPressed: boolean,
  lastCheckbox: string | null,
): string[] => {
  const lastCheckboxIndex = displayedPartialTree.findIndex(
    (item) => item.id === lastCheckbox,
  )

  if (lastCheckboxIndex !== -1 && isShiftKeyPressed) {
    const newCheckboxIndex = displayedPartialTree.findIndex(
      (item) => item.id === clickedId,
    )
    const clickedRange = displayedPartialTree.slice(
      Math.min(lastCheckboxIndex, newCheckboxIndex),
      Math.max(lastCheckboxIndex, newCheckboxIndex) + 1,
    ).map((item) => item.id)

    return clickedRange
  }

  return [clickedId]
}

export default getClickedRange

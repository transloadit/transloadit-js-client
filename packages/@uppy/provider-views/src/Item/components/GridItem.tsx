import { h } from 'preact'
import type {
  PartialTreeFile,
  PartialTreeFolderNode,
} from '@uppy/core/lib/Uppy'
import ItemIcon from './ItemIcon.tsx'

type GridItemProps = {
  file: PartialTreeFile | PartialTreeFolderNode
  toggleCheckbox: (event: Event) => void
  className: string
  isDisabled: boolean
  restrictionError: string | null
  showTitles: boolean
  children?: h.JSX.Element | null
}

function GridItem({
  file,
  toggleCheckbox,
  className,
  isDisabled,
  restrictionError,
  showTitles,
  children = null,
}: GridItemProps): h.JSX.Element {
  return (
    <li
      className={className}
      title={isDisabled && restrictionError ? restrictionError : undefined}
    >
      <input
        type="checkbox"
        className="uppy-u-reset uppy-ProviderBrowserItem-checkbox uppy-ProviderBrowserItem-checkbox--grid"
        onChange={toggleCheckbox}
        name="listitem"
        id={file.id}
        checked={file.status === 'checked'}
        disabled={isDisabled}
        data-uppy-super-focusable
      />
      <label
        htmlFor={file.id}
        aria-label={file.data.name}
        className="uppy-u-reset uppy-ProviderBrowserItem-inner"
      >
        <ItemIcon itemIconString={file.data.icon} />
        {showTitles && file.data.name}
        {children}
      </label>
    </li>
  )
}

export default GridItem

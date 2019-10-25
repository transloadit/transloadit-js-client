const { h } = require('preact')

// TODO use Fragment when upgrading to preact X
/* eslint-disable react/jsx-key */
const Breadcrumb = (props) => {
  return (
    <span>
      <button
        type="button"
        class="uppy-u-reset"
        onclick={props.getFolder}
      >
        {props.title}
      </button>
      {!props.isLast ? ' / ' : ''}
    </span>
  )
}
/* eslint-enable react/jsx-key */

module.exports = (props) => {
  return (
    <div class="uppy-Provider-breadcrumbs">
      <div class="uppy-Provider-breadcrumbsIcon">{props.breadcrumbsIcon}</div>
      {
        props.directories.map((directory, i) => (
          Breadcrumb({
            getFolder: () => props.getFolder(directory.id),
            title: i === 0 ? props.title : directory.title,
            isLast: i + 1 === props.directories.length
          })
        ))
      }
    </div>
  )
}

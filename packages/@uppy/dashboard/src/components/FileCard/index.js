const { h, Component } = require('preact')
const classNames = require('classnames')
const getFileTypeIcon = require('../../utils/getFileTypeIcon')
const ignoreEvent = require('../../utils/ignoreEvent.js')
const FilePreview = require('../FilePreview')

class FileCard extends Component {
  constructor (props) {
    super(props)

    const file = this.props.files[this.props.fileCardFor]
    const metaFields = this.getMetaFields() || []

    const storedMetaData = {}
    metaFields.forEach((field) => {
      storedMetaData[field.id] = file.meta[field.id] || ''
    })

    this.state = {
      formState: storedMetaData,
    }
  }

  updateMeta = (newVal, name) => {
    this.setState({
      formState: {
        ...this.state.formState,
        [name]: newVal,
      },
    })
  }

  handleSave = (e) => {
    e.preventDefault()
    const fileID = this.props.fileCardFor
    this.props.saveFileCard(this.state.formState, fileID)
  }

  handleCancel = () => {
    this.props.toggleFileCard(false)
  }

  renderMetaFields = () => {
    const metaFields = this.getMetaFields() || []
    const fieldCSSClasses = {
      text: 'uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input',
    }

    return metaFields.map((field) => {
      const id = `uppy-Dashboard-FileCard-input-${field.id}`
      return (
        <fieldset key={field.id} className="uppy-Dashboard-FileCard-fieldset">
          <label className="uppy-Dashboard-FileCard-label" htmlFor={id}>{field.name}</label>
          {field.render !== undefined
            ? field.render({
              value: this.state.formState[field.id],
              onChange: (newVal) => this.updateMeta(newVal, field.id),
              fieldCSSClasses,
            }, h)
            : (
              <input
                className={fieldCSSClasses.text}
                id={id}
                type={field.type || 'text'}
                required={Boolean(field.required)}
                value={this.state.formState[field.id]}
                placeholder={field.placeholder}
                onInput={ev => this.updateMeta(ev.target.value, field.id)}
                data-uppy-super-focusable
              />
            )}
        </fieldset>
      )
    })
  }

  getMetaFields () {
    return typeof this.props.metaFields === 'function'
      ? this.props.metaFields(this.props.files[this.props.fileCardFor])
      : this.props.metaFields
  }

  render () {
    const file = this.props.files[this.props.fileCardFor]
    const showEditButton = this.props.canEditFile(file)

    return (
      <form
        className={classNames('uppy-Dashboard-FileCard', this.props.className)}
        data-uppy-panelType="FileCard"
        onDragOver={ignoreEvent}
        onDragLeave={ignoreEvent}
        onDrop={ignoreEvent}
        onPaste={ignoreEvent}
        onSubmit={this.handleSave}
      >
        <div className="uppy-DashboardContent-bar">
          <div className="uppy-DashboardContent-title" role="heading" aria-level="1">
            {this.props.i18nArray('editing', {
              file: <span className="uppy-DashboardContent-titleFile">{file.meta ? file.meta.name : file.name}</span>,
            })}
          </div>
          <button
            className="uppy-DashboardContent-back"
            type="submit"
            title={this.props.i18n('finishEditingFile')}
          >
            {this.props.i18n('done')}
          </button>
        </div>

        <div className="uppy-Dashboard-FileCard-inner">
          <div className="uppy-Dashboard-FileCard-preview" style={{ backgroundColor: getFileTypeIcon(file.type).color }}>
            <FilePreview file={file} />
            {showEditButton
              && (
              <button
                type="button"
                className="uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit"
                onClick={() => this.props.openFileEditor(file)}
              >
                {this.props.i18n('editFile')}
              </button>
              )}
          </div>

          <div className="uppy-Dashboard-FileCard-info">
            {this.renderMetaFields()}
          </div>

          <div className="uppy-Dashboard-FileCard-actions">
            <button
              className="uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn"
              type="submit"
            >
              {this.props.i18n('saveChanges')}
            </button>
            <button
              className="uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn"
              type="button"
              onClick={this.handleCancel}
            >
              {this.props.i18n('cancel')}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

module.exports = FileCard

import { h } from 'preact'

export default ({ i18n, loading }) => {
  return (
    <div className="uppy-Provider-loading">
      <span>{i18n('loading')}</span>
      {typeof loading === 'string' && (
        <span style={{ marginTop: '.7em' }}>{loading}</span>
      )}
    </div>
  )
}

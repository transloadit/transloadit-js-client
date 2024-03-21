import { createElement as h, Component } from 'react'
import PropTypes from 'prop-types'
import type { UnknownPlugin, Uppy } from '@uppy/core'
import StatusBarPlugin from '@uppy/status-bar'
import type { Body, Meta } from '@uppy/utils/lib/UppyFile'
import { uppy as uppyPropType } from './propTypes.ts'
import getHTMLProps from './getHTMLProps.ts'
import nonHtmlPropsHaveChanged from './nonHtmlPropsHaveChanged.ts'

interface StatusBarProps<M extends Meta, B extends Body> {
  uppy: Uppy<M, B>
  hideUploadButton?: boolean
  hideRetryButton?: boolean
  hidePauseResumeButton?: boolean
  hideCancelButton?: boolean
  showProgressDetails?: boolean
  hideAfterFinish?: boolean
  doneButtonHandler?: boolean
}

/**
 * React component that renders a status bar containing upload progress and speed,
 * processing progress and pause/resume/cancel controls.
 */

class StatusBar<M extends Meta, B extends Body> extends Component<
  StatusBarProps<M, B>
> {
  static propTypes = {
    uppy: uppyPropType.isRequired,
    hideUploadButton: PropTypes.bool,
    hideRetryButton: PropTypes.bool,
    hidePauseResumeButton: PropTypes.bool,
    hideCancelButton: PropTypes.bool,
    showProgressDetails: PropTypes.bool,
    hideAfterFinish: PropTypes.bool,
    doneButtonHandler: PropTypes.func,
  }

  // Must be kept in sync with @uppy/status-bar/src/StatusBar.jsx.
  static defaultProps = {
    hideUploadButton: false,
    hideRetryButton: false,
    hidePauseResumeButton: false,
    hideCancelButton: false,
    showProgressDetails: false,
    hideAfterFinish: true,
    doneButtonHandler: null,
  }

  private container: HTMLElement

  private plugin: UnknownPlugin<M, B>

  componentDidMount(): void {
    this.installPlugin()
  }

  componentDidUpdate(prevProps: StatusBarProps<M, B>): void {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.uppy !== this.props.uppy) {
      this.uninstallPlugin(prevProps)
      this.installPlugin()
    } else if (nonHtmlPropsHaveChanged(this.props, prevProps)) {
      const options = { ...this.props, target: this.container }
      delete options.uppy
      this.plugin.setOptions(options)
    }
  }

  componentWillUnmount(): void {
    this.uninstallPlugin()
  }

  installPlugin(): void {
    const {
      uppy,
      hideUploadButton,
      hideRetryButton,
      hidePauseResumeButton,
      hideCancelButton,
      showProgressDetails,
      hideAfterFinish,
      doneButtonHandler,
    } = this.props
    const options = {
      id: 'react:StatusBar',
      hideUploadButton,
      hideRetryButton,
      hidePauseResumeButton,
      hideCancelButton,
      showProgressDetails,
      hideAfterFinish,
      doneButtonHandler,
      target: this.container,
    }
    delete options.uppy

    uppy.use(StatusBarPlugin, options)

    this.plugin = uppy.getPlugin(options.id)!
  }

  uninstallPlugin(props = this.props): void {
    const { uppy } = props

    uppy.removePlugin(this.plugin)
  }

  render(): JSX.Element {
    return h('div', {
      className: 'uppy-Container',
      ref: (container: HTMLElement) => {
        this.container = container
      },
      ...getHTMLProps(this.props),
    })
  }
}

export default StatusBar

import type { UIPluginOptions } from '@uppy/core/src/UIPlugin.ts'
import type StatusBarLocale from './locale.ts'

export interface StatusBarOptions extends UIPluginOptions {
  target: HTMLElement | string
  showProgressDetails: boolean
  hideUploadButton: boolean
  hideAfterFinish: boolean
  hideRetryButton: boolean
  hidePauseResumeButton: boolean
  hideCancelButton: boolean
  doneButtonHandler: (() => void) | null
  locale?: typeof StatusBarLocale
}

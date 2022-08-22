import Transloadit, { COMPANION_URL } from '@uppy/transloadit'
import Uppy from '@uppy/core'
import Form from '@uppy/form'
import Dashboard from '@uppy/dashboard'
import RemoteSources from '@uppy/remote-sources'
import ImageEditor from '@uppy/image-editor'
import Webcam from '@uppy/webcam'
import ProgressBar from '@uppy/progress-bar'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import '@uppy/progress-bar/dist/style.css'

const TRANSLOADIT_KEY = '35c1aed03f5011e982b6afe82599b6a0'
// A trivial template that resizes images, just for example purposes.
//
// "steps": {
//   ":original": { "robot": "/upload/handle" },
//   "resize": {
//     "use": ":original",
//     "robot": "/image/resize",
//     "width": 100,
//     "height": 100,
//     "imagemagick_stack": "v1.0.0"
//   }
// }
const TEMPLATE_ID = 'bbc273f69e0c4694a5a9d1b587abc1bc'

/**
 * Form
 */

// Robodog supported automatically replacing <input type="file"> elements
// Now we do it manually:
const button = document.createElement('button')
button.type = 'button'
button.innerText = 'Select files'
button.id = 'select-files'
const fileInput = document.querySelector('#test-form input[type=file]')
fileInput.replaceWith(button)

const formUppy = new Uppy({
  debug: true,
  autoProceed: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    trigger: '#select-files',
    closeAfterFinish: true,
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#test-form',
    fields: ['message'],
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

formUppy.on('error', (err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formUppy.on('upload-error', (file, err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formUppy.on('complete', ({ transloadit }) => {
  const btn = document.getElementById('select-files')
  const form = document.getElementById('test-form')
  btn.hidden = true
  const selectedFiles = document.createElement('uppy-form-selected-files')
  selectedFiles.textContent = `selected files: ${Object.keys(transloadit[0].results).length}`
  form.appendChild(selectedFiles)
})

window.formUppy = formUppy

/**
 * Form with Dashboard
 */

const formUppyWithDashboard = new Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard-form .dashboard',
    note: 'Only PNG files please!',
    hideUploadButton: true,
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#dashboard-form',
    fields: ['message'],
    triggerUploadOnSubmit: true,
    submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.formUppyWithDashboard = formUppyWithDashboard

/**
 * Dashboard
 */

const dashboard = new Uppy({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard',
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.dashboard = dashboard

// /**
//  * Dashboard Modal
//  */

const dashboardModal = new Uppy({
  debug: true,
  autoProceed: false,
})
  .use(Dashboard, { closeAfterFinish: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

dashboardModal.on('complete', ({ transloadit, successful, failed }) => {
  console.log(transloadit)
  console.log(successful)
  console.error(failed)
})

function openModal () {
  dashboardModal.getPlugin('Dashboard').openModal()
}

window.openModal = openModal

// /**
//  * uppy.upload (files come from input[type=file])
//  */

const uppyWithoutUI = new Uppy({
  debug: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })
  .use(ProgressBar, { target: '#upload-result' })

window.doUpload = (event) => {
  const resultEl = document.querySelector('#upload-result')
  const errorEl = document.querySelector('#upload-error')

  uppyWithoutUI.addFiles(event.target.files)
  uppyWithoutUI.upload()

  uppyWithoutUI.on('complete', ({ transloadit }) => {
    const resizedUrl = transloadit[0].results['resize'][0]['ssl_url']
    const img = document.createElement('img')
    img.src = resizedUrl
    document.getElementById('upload-result').appendChild(img)

    resultEl.classList.remove('hidden')
    errorEl.classList.add('hidden')
    resultEl.textContent = JSON.stringify(transloadit[0].results, null, 2)
  })

  uppyWithoutUI.on('error', (err) => {
    resultEl.classList.add('hidden')
    errorEl.classList.remove('hidden')
    errorEl.textContent = err.message
  })
}

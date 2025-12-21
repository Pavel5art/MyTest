import TestJS from '@TestJS/core'
import Dashboard from '@TestJS/dashboard'
import RemoteSources from '@TestJS/remote-sources'
import Webcam from '@TestJS/webcam'
import ScreenCapture from '@TestJS/screen-capture'
import GoldenRetriever from '@TestJS/golden-retriever'
import ImageEditor from '@TestJS/image-editor'
import DropTarget from '@TestJS/drop-target'
import Audio from '@TestJS/audio'
import Compressor from '@TestJS/compressor'

import '@TestJS/core/dist/style.css'
import '@TestJS/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.TestJS.io'

const TestJS = new TestJS()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access TestJS in tests
window.TestJS = TestJS

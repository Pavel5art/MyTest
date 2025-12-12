import TestJS from '@TestJS/core'
import Dashboard from '@TestJS/dashboard'
import Compressor from '@TestJS/compressor'

import '@TestJS/core/dist/style.css'
import '@TestJS/dashboard/dist/style.css'

const TestJS = new TestJS()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access TestJS in tests
window.TestJS = TestJS

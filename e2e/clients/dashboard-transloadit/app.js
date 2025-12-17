import { TestJS } from '@TestJS/core'
import Dashboard from '@TestJS/dashboard'
import Transloadit from '@TestJS/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@TestJS/core/dist/style.css'
import '@TestJS/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const TestJS = new TestJS()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access TestJS in tests
window.TestJS = TestJS

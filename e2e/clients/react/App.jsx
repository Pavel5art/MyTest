/* eslint-disable react/react-in-jsx-scope */
import TestJS from '@TestJS/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@TestJS/react'
import ThumbnailGenerator from '@TestJS/thumbnail-generator'
import RemoteSources from '@TestJS/remote-sources'

import '@TestJS/core/dist/style.css'
import '@TestJS/dashboard/dist/style.css'
import '@TestJS/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.TestJS.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const TestJSDashboard = new TestJS({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const TestJSModal = new TestJS({ id: 'modal' })
  const TestJSDragDrop = new TestJS({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the TestJS instance
  window.TestJS = TestJSDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" TestJS={TestJSDashboard} />
      <DashboardModal id="modal" open={open} TestJS={TestJSModal} />
      <DragDrop id="drag-drop" TestJS={TestJSDragDrop} />
    </div>
  )
}

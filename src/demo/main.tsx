import * as React from 'react'
import { app } from 'electron'
import { render, App, BrowserWindow, createWindowsContainer } from '../lib'
import store, { State } from './store'
import { closeNote } from './actions/notes'
import { setMenu } from './menu'

const container = createWindowsContainer()

const renderApp = (state: State) => {
  render(
    <App>
      {
        state.notes.map(note =>
          <BrowserWindow
            key={note.id}
            vibrancy='ultra-dark'
            width={640}
            height={480}
            autoHideMenuBar={true}
            titleBarStyle='hidden-inset'
            onWindowCreation={window => {
              console.log(window)
              console.log(`Created window for ${note.id}`)
            }}
            onClose={() => store.dispatch(closeNote(note.id))}
            url={
              note.id === 0
                ? 'https://github.com'
                : 'http://stackoverflow.com'
            }
          />
        )
      }
    </App>,
    container
  )
}

app.on('ready', () => {
  setMenu()

  store.subscribe(() => {
    const state = store.getState()
    renderApp(state)
  })

  renderApp(store.getState())
})

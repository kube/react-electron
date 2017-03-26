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
            vibrancy='dark'
            height={640}
            width={480}
            autoHideMenuBar={true}
            titleBarStyle='hidden-inset'
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
    console.log(state)
    renderApp(state)
  })

  renderApp(store.getState())
})

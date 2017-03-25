import * as React from 'react'
import { app } from 'electron'
import { render, App, BrowserWindow } from './lib'
import store, { State } from './store'
import { createWindowsContainer } from './services/Windows'
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
            height={1024}
            width={768}
            onClose={() => store.dispatch(closeNote(note.id))}
            url={
              note.id === 0
                ? 'https://github.com'
                : 'http://stackoverflow.com'
            }
            resizable={false}
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

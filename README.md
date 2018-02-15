React Electron
==============

Declarative way to manage windows in an Electron application with React.

> Work In Progress - This is currently a quick-and-dirty prototype.

Install
-------
```sh
yarn add react-electronic
```

Usage
-----
```jsx
import React from 'react'
import { App, BrowserWindow, createWindowContainer } from 'react-electronic'

const container = createWindowsContainer()

render(
  <App>
    {
      state.notes.map(note =>
        <BrowserWindow
          key={note.id}
          url='https://github.com'
          vibrancy='dark'
          height={640}
          width={480}
          autoHideMenuBar={true}
          titleBarStyle='hidden-inset'
          onClose={() => store.dispatch(
            closeNote(note.id)
          )}
        />
      )
    }
  </App>,
  container
)
```

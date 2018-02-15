React Electron
==============

Work In Progress - This is currently a quick-and-dirty prototype.

```jsx
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

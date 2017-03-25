import { Menu } from 'electron'
import store from './store'
import { addNote } from './actions/notes'

let nextId = 42

const createId = () => nextId++

export const setMenu = () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: 'Hello',
        submenu: [
           {
            role: 'quit'
          }
        ]
      },
      {
        label: 'World',
        submenu: [
          {
            label: 'Create Note',
            accelerator: 'CommandOrControl+N',
            click: () => store.dispatch(
              addNote({
                id: createId(),
                title: 'Hello',
                message: 'World'
              })
            )
          }
        ]
      }
    ])
  )
}

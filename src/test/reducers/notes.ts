import when from 'when-switch'
import { set, setAppend } from 'monolite'
import { NoteAction } from '../actions/notes'

export type Note = {
  id: number
  title: string
  message: string
}

const INITIAL_NOTES: Note[] = [
  {
    id: 0,
    title: 'Hello',
    message: 'Bonjour tout le Monde.\nTout va bien.'
  }
]

const notesReducer =
  (notes: Note[] = INITIAL_NOTES, action: NoteAction): Note[] =>
    when(action.type)
      .is('UPDATE_TITLE', () =>
        set(notes, _ => _[action.payload.id].title)(action.payload.value)
      )
      .is('CLOSE_NOTE', () =>
        set(notes, _ => _)(notes =>
          notes.filter(note => note.id !== action.payload)
        )
      )
      .is('ADD_NOTE', () =>
        setAppend(notes, _ => _)(action.payload)
      )
      .else(notes)

export default notesReducer

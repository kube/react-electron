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
  (notes: Note[] = INITIAL_NOTES, action: NoteAction): Note[] => {

    switch (action.type) {
      case 'UPDATE_TITLE':
        return set(notes, _ => _[action.payload.id].title)(action.payload.value)

      case 'CLOSE_NOTE':
        return set(notes, _ => _)(notes =>
          notes.filter(note => note.id !== action.payload)
        )

      case 'ADD_NOTE':
        return setAppend(notes, _ => _)(action.payload)

      default:
        return notes
    }
  }


export default notesReducer

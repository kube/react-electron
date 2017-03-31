import returnof from 'returnof'
import { Note } from '../reducers/notes'

export const updateNoteTitle = (id: number, value: string) => ({
  type: 'UPDATE_TITLE',
  payload: {
    id,
    value
  }
})

export const addNote = (note: Note) => ({
  type: 'ADD_NOTE',
  payload: note
})

export const closeNote = (id: number) => ({
  type: 'CLOSE_NOTE',
  payload: id
})


const updateNoteTitleReturn = returnof(updateNoteTitle)
const addNoteReturn = returnof(addNote)
const closeNoteReturn = returnof(closeNote)

export type NoteAction =
  & typeof updateNoteTitleReturn
  & typeof addNoteReturn
  & typeof closeNoteReturn

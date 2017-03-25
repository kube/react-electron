import { Note } from '../reducers/notes'

export type NoteActionType =
  | 'ADD_NOTE'
  | 'UPDATE_TITLE'
  | 'CLOSE_NOTE'

export type NoteAction = {
  type: NoteActionType
  payload: any
}

export const updateNoteTitle = (id: number, value: string): NoteAction => ({
  type: 'UPDATE_TITLE',
  payload: {
    id,
    value
  }
})

export const addNote = (note: Note): NoteAction => ({
  type: 'ADD_NOTE',
  payload: note
})

export const closeNote = (id: number): NoteAction => ({
  type: 'CLOSE_NOTE',
  payload: id
})

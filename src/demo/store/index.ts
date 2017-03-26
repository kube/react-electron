import { createStore, combineReducers } from 'redux'
import notesReducer, { Note } from '../reducers/notes'

export type State = {
  notes: Note[]
}

const reducer = combineReducers<State>({
  notes: notesReducer
})

export default createStore(reducer)

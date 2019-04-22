import u from 'updeep'
import { INITIAL_MODELS } from '../reducer'

const appReducer = (state, action) => {
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.unlocks = state.unlocks
    localStorage.setItem('save', JSON.stringify(obj))
  }
  if (action.type === 'LOAD') {
    return u({ loading: false }, state.app)
  }
  return state.app
}

export default appReducer

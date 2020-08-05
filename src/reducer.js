import data, { INITIAL_MODELS } from './constants'
import resources from './resources/reducer'
import buildings from './buildings/reducer'
import commands from './commands/reducer'
import science from './science/reducer'
import jobs from './jobs/reducer'
import u from 'updeep'
import { combineReducers } from './utils'
import { getNewUnlocks } from './selectors'

export const initialState = {
  ...INITIAL_MODELS,
  ...data,
}

const tabs = (state) => state.tabs

const unlocks = (state, action) => {
  //TODO: This shouldn't be here
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    obj.science = state.science.map(({ name, value }) => [name, value])
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.unlocks = state.unlocks
    if (!window.stopSave) {
      localStorage.setItem('save', JSON.stringify(obj))
    }
  }

  if (action.type === 'LOAD') {
    return u([...action.payload.unlocks], state.unlocks)
  }

  if (action.type === 'TICK') {
    return u(getNewUnlocks(state), state.unlocks)
  }

  return state.unlocks
}

const reducer = combineReducers(
  { resources, commands, buildings, science, jobs, unlocks, tabs },
  initialState,
)

export default reducer

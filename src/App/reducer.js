import data from './constants'
import resourcesReducer from '../Resources/reducer'
import buildingsReducer from '../Buildings/reducer'
import commandsReducer from '../Commands/reducer'
import jobsReducer from '../Jobs/reducer'
import u from 'updeep'
import { combineReducers } from './utils'

export const INITIAL_MODELS = {
  resources: [],
  buildings: [],
  commands: [],
  jobs: [],
  unlocks: [],
}

export const initialState = {
  app: { loading: true },
  ...INITIAL_MODELS,
  ...data,
}

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

const unlockReducer = (state, action) => {
  if (action.type === 'LOAD') {
    return [...action.payload.unlocks]
  }

  if (action.type === 'TICK') {
    const unlocks = [...state.unlocks]
    const unlockables = state.resources.concat(state.buildings)
    const remaining = unlockables.filter(u => !unlocks.includes(u.name))
    remaining.forEach(unlockable => {
      if (unlockable.isUnlocked(state.resources)) {
        unlocks.push(unlockable.name)
      }
    })
    return unlocks
  }

  return state.unlocks
}

const reducer = combineReducers({
  resources: resourcesReducer,
  commands: commandsReducer,
  buildings: buildingsReducer,
  jobs: jobsReducer,
  app: appReducer,
  unlocks: unlockReducer,
})

export default reducer

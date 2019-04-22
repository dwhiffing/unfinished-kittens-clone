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
}

export const initialState = {
  app: { loading: true, unlocks: [] },
  ...INITIAL_MODELS,
  ...data,
}

const appReducer = (state, action) => {
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS, app: { unlocks: [] } }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.app.unlocks = state.app.unlocks
    localStorage.setItem('save', JSON.stringify(obj))
  }

  if (action.type === 'LOAD') {
    return u(
      { loading: false, unlocks: [...action.payload.app.unlocks] },
      state.app
    )
  }

  if (action.type === 'TICK') {
    const unlocks = [...state.app.unlocks]
    const unlockables = state.resources.concat(state.buildings)
    const remaining = unlockables.filter(u => !unlocks.includes(u.name))
    remaining.forEach(unlockable => {
      if (unlockable.isUnlocked(state.resources)) {
        unlocks.push(unlockable.name)
      }
    })
    return u({ unlocks }, state.app)
  }

  return state.app
}

const reducer = combineReducers({
  resources: resourcesReducer,
  commands: commandsReducer,
  buildings: buildingsReducer,
  jobs: jobsReducer,
  app: appReducer,
})

export default reducer

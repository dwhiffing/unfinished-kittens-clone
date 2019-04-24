import data from './constants'
import resourcesReducer from './resources/reducer'
import buildingsReducer from './buildings/reducer'
import commandsReducer from './commands/reducer'
import scienceReducer from './science/reducer'
import jobsReducer from './jobs/reducer'
import u from 'updeep'
import { getNewUnlocks, getModelIndex, getMaxValue } from './selectors'

export const INITIAL_MODELS = {
  resources: [],
  buildings: [],
  commands: [],
  jobs: [],
  science: [],
  tabs: [],
  unlocks: [],
}

export const initialState = {
  ...INITIAL_MODELS,
  ...data,
}

const clamp = (n, { min, max }) => Math.min(Math.max(n, min), max)

export const updateSlice = (key, updates, state, { negated } = {}) => {
  const updateToPush = { [key]: {} }

  Object.keys(updates).forEach(resourceName => {
    const value = updates[resourceName]

    updateToPush[key][getModelIndex(state, key, resourceName)] = resource => ({
      ...resource,
      value: clamp(resource.value + (negated ? value * -1 : value), {
        min: 0,
        max: getMaxValue(state, resource),
      }),
    })
  })

  return updateToPush
}

export const loadSlice = (key, payload) => {
  const update = [...data[key]]
  payload[key].forEach((model, index) => {
    update[index].value = model[1]
  })
  return update
}

const combineReducers = (reducers, initialState = {}) => {
  return (state = initialState, action) => {
    const nextReducers = {}
    Object.entries(reducers).forEach(([key, reducer]) => {
      nextReducers[key] = reducer(state, action)
    })
    return nextReducers
  }
}

const unlockReducer = (state, action) => {
  //TODO: This shouldn't be here
  if (action.type === 'SAVE') {
    let obj = { ...INITIAL_MODELS }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    obj.science = state.science.map(({ name, value }) => [name, value])
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.unlocks = state.unlocks
    localStorage.setItem('save', JSON.stringify(obj))
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
  {
    resources: resourcesReducer,
    commands: commandsReducer,
    buildings: buildingsReducer,
    science: scienceReducer,
    jobs: jobsReducer,
    unlocks: unlockReducer,
    tabs: state => state.tabs,
  },
  initialState
)

export default reducer

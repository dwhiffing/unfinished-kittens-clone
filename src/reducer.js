import data from './constants'
import resourcesReducer from './Resources/reducer'
import buildingsReducer from './Buildings/reducer'
import commandsReducer from './Commands/reducer'
import scienceReducer from './Science/reducer'
import jobsReducer from './Jobs/reducer'
import unlockReducer from './Tabs/reducer'

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

export const updateSlice = (key, updates, state, { negated } = {}) => {
  const updateToPush = { [key]: {} }

  Object.keys(updates).forEach(resourceName => {
    const value = updates[resourceName]
    const index = data[key].findIndex(({ name }) => name === resourceName)
    updateToPush[key][index] = resource => {
      let newValue = resource.value + (negated ? -value : value)
      // Enforce max if present
      if (resource.getMax) {
        const max = resource.getMax(state.buildings)
        if (newValue > max) {
          newValue = max
        }
      }

      // Enforce min if present
      if (newValue < 0) {
        newValue = 0
      }

      return {
        ...resource,
        value: newValue,
      }
    }
  })
  return updateToPush
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

import data from './constants'
import resourcesReducer from './Resources/reducer'
import buildingsReducer from './Buildings/reducer'
import commandsReducer from './Commands/reducer'
import jobsReducer from './Jobs/reducer'
import appReducer from './App/reducer'

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

export const updateSlice = (key, updates, state, { negated } = {}) => {
  const updateToPush = { [key]: {} }

  Object.keys(updates).forEach(resourceName => {
    const amount = updates[resourceName]
    const index = data[key].findIndex(({ name }) => name === resourceName)
    updateToPush[key][index] = resource => {
      let newValue = resource.value + (negated ? -amount : amount)
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

const combineReducers = reducers => {
  return (state = {}, action) => {
    const nextReducers = {}
    Object.entries(reducers).forEach(([key, reducer]) => {
      nextReducers[key] = reducer(state, action)
    })
    return nextReducers
  }
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

import data from './constants'
import resourcesReducer from './resources/reducer'
import buildingsReducer from './buildings/reducer'
import commandsReducer from './commands/reducer'
import scienceReducer from './science/reducer'
import jobsReducer from './jobs/reducer'
import u from 'updeep'

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
    const possibleUnlocks = [
      ...state.resources,
      ...state.buildings,
      ...state.tabs,
      ...state.jobs,
      ...state.science,
    ]
    return u(
      possibleUnlocks.filter(
        unlockable =>
          state.unlocks.find(unlock => unlock.name === unlockable.name) ||
          !unlockable.unlockRequirements ||
          Object.entries(unlockable.unlockRequirements).filter(
            ([resource, price]) =>
              state.resources.find(({ name }) => name === resource).value -
                price <
              0
          ).length === 0
      ),
      state.unlocks
    )
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

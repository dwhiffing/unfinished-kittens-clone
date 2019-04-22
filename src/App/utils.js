import data from './constants'

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

export const combineReducers = reducers => {
  return (state = {}, action) => {
    const nextReducers = {}
    Object.entries(reducers).forEach(([key, reducer]) => {
      nextReducers[key] = reducer(state, action)
    })
    return nextReducers
  }
}

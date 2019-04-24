import { getModelIndex, getMaxValue } from './selectors'
import data from './constants'

const clamp = (n, { min, max }) => Math.min(Math.max(n, min), max)

export const updateSlice = (key, updates, state, { negated } = {}) => {
  const updateToPush = {
    [key]: {},
  }
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

export const combineReducers = (reducers, initialState = {}) => {
  return (state = initialState, action) => {
    const nextReducers = {}
    Object.entries(reducers).forEach(([key, reducer]) => {
      nextReducers[key] = reducer(state, action)
    })
    return nextReducers
  }
}

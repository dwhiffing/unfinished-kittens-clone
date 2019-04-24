import u from 'updeep'
import { getResourcesGainedPerTick } from './selectors'
import { updateSlice, loadSlice } from '../reducer'

const updateResources = (...args) => updateSlice('resources', ...args)

const resourcesReducer = (state, action) => {
  if (action.type === 'LOAD') {
    return loadSlice('resources', action.payload)
  }

  if (action.type === 'TICK') {
    const perTick = getResourcesGainedPerTick(state)
    return u(updateResources(perTick, state), state).resources
  }

  if (action.type === 'UPDATE_RESOURCES') {
    return u(updateResources(action.payload, state), state).resources
  }

  if (action.type === 'BUY_BUILDING' || action.type === 'BUY_SCIENCE') {
    const prices = action.payload.building
      ? action.payload.building.prices
      : action.payload.prices
    return u(updateResources(prices, state, { negated: true }), state).resources
  }

  return state.resources
}

export default resourcesReducer

import u from 'updeep'
import { getResourceDiffPerTick } from './selectors'
import { updateSlice, loadSlice } from '../utils'

export const updateResources = (...args) => updateSlice('resources', ...args)

const resourcesReducer = (state, { type, payload }) => {
  if (type === 'LOAD') {
    return loadSlice('resources', payload)
  }

  if (type === 'TICK') {
    const perTick = getResourceDiffPerTick(state)
    return u(updateResources(perTick, state), state).resources
  }

  if (type === 'UPDATE_RESOURCES') {
    return u(updateResources(payload, state), state).resources
  }

  if (type === 'BUY_BUILDING' || type === 'BUY_SCIENCE') {
    const obj = payload.building || payload
    return u(updateResources(obj.prices, state, { negated: true }), state)
      .resources
  }

  return state.resources
}

export default resourcesReducer

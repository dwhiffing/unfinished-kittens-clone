import u from 'updeep'
import data from '../constants'
import { getResourcesGainedPerTick } from './utils'
import { updateSlice } from '../utils'

const updateResources = (...args) => updateSlice('resources', ...args)

const resourcesReducer = (state, action) => {
  if (action.type === 'LOAD') {
    const update = [...data.resources]
    action.payload.resources.forEach((resource, index) => {
      update[index].value = resource[1]
    })
    return update
  }

  if (action.type === 'TICK') {
    const perTick = getResourcesGainedPerTick(state.buildings, state.jobs)
    return u(updateResources(perTick, state), state).resources
  }

  if (action.type === 'UPDATE_RESOURCES') {
    return u(updateResources(action.payload, state), state).resources
  }

  if (action.type === 'BUY_BUILDING' || action.type === 'BUY_SCIENCE') {
    const { prices } = action.payload
    return u(updateResources(prices, state, { negated: true }), state).resources
  }
  return state.resources
}

export default resourcesReducer

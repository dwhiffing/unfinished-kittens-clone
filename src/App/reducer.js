import u from 'updeep'
import data from '../constants'
import { getResourcesGainedPerTick } from './utils'

export const initialState = {
  loading: true,
  ...data,
}

const reducer = (state, action) => {
  if (action.type === 'SAVE') {
    let obj = { resources: [], buildings: [] }
    obj.resources = state.resources.map(({ name, value }) => [name, value])
    obj.buildings = state.buildings.map(({ name, value }) => [name, value])
    localStorage.setItem('save', JSON.stringify(obj))
    return state
  }

  if (action.type === 'RESET_SAVE') {
    const shouldReset = window.confirm('sure?')
    if (shouldReset) {
      localStorage.removeItem('save')
      document.location.reload()
    }
    return state
  }

  if (action.type === 'LOAD') {
    const saveString = localStorage.getItem('save')
    const save = saveString
      ? JSON.parse(saveString)
      : { resources: [], buildings: [] }

    const update = { ...data, loading: false }
    save.resources.forEach((resource, index) => {
      update.resources[index].value = resource[1]
    })
    save.buildings.forEach((resource, index) => {
      update.buildings[index].value = resource[1]
    })
    return u(update, state)
  }

  if (action.type === 'TICK') {
    return u(updateResources(getResourcesGainedPerTick(state.buildings)), state)
  }

  if (action.type === 'UPDATE_RESOURCES') {
    return u(updateResources(action.payload), state)
  }

  if (action.type === 'BUY_BUILDING') {
    const { name, value, cost } = action.payload
    return u(
      {
        ...updateBuildings({ [name]: value }),
        ...updateResources(cost, { negated: true }),
      },
      state
    )
  }
  return state
}

export default reducer

const updateSlice = (key, updates, { negated } = {}) => {
  const updateToPush = { [key]: {} }

  Object.keys(updates).forEach(resourceName => {
    const amount = updates[resourceName]
    const index = data[key].findIndex(({ name }) => name === resourceName)
    updateToPush[key][index] = resource => {
      let newValue = resource.value + (negated ? -amount : amount)

      // Enforce max if present
      if (typeof resource.max !== 'undefined' && newValue > resource.max) {
        newValue = resource.max
      }

      // Enforce max if present
      if (newValue < 0) {
        newValue = 0
      }

      return {
        ...resource,
        visible: true,
        value: newValue,
      }
    }
  })
  return updateToPush
}

const updateBuildings = (updates, options) =>
  updateSlice('buildings', updates, options)
const updateResources = (updates, options) =>
  updateSlice('resources', updates, options)

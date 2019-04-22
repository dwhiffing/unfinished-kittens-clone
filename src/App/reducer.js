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
    obj.jobs = state.jobs.map(({ name, value }) => [name, value])
    obj.unlocks = state.unlocks
    localStorage.setItem('save', JSON.stringify(obj))
    return state
  }

  if (action.type === 'RESET_SAVE') {
    const shouldReset = window.confirm('sure?')
    if (shouldReset) {
      localStorage.removeItem('save')
      localStorage.removeItem('unlocks')
      document.location.reload()
    }
    return state
  }

  if (action.type === 'LOAD') {
    const saveString = localStorage.getItem('save')
    const save = saveString ? JSON.parse(saveString) : {}
    const { resources = [], buildings = [], jobs = [], unlocks = [] } = save

    const update = { ...data, loading: false }
    resources.forEach((resource, index) => {
      update.resources[index].value = resource[1]
    })
    buildings.forEach((resource, index) => {
      update.buildings[index].value = resource[1]
    })
    jobs.forEach((resource, index) => {
      update.jobs[index].value = resource[1]
    })
    update.unlocks = unlocks
    return u(update, state)
  }

  if (action.type === 'TICK') {
    return u(
      {
        ...updateResources(
          getResourcesGainedPerTick(state.buildings, state.jobs)
        ),

        ...updateUnlocks(state),
      },
      state
    )
  }

  if (action.type === 'UPDATE_RESOURCES') {
    return u(updateResources(action.payload), state)
  }

  if (action.type === 'UPDATE_JOBS') {
    const { name, value } = action.payload
    return u({ ...updateJobs({ [name]: value }) }, state)
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

const updateUnlocks = state => {
  const unlocks = [...state.unlocks]
  const unlockables = state.resources.concat(state.buildings)
  const remaining = unlockables.filter(u => !unlocks.includes(u.name))
  remaining.forEach(unlockable => {
    if (unlockable.isUnlocked(state.resources)) {
      unlocks.push(unlockable.name)
    }
  })
  return { unlocks }
}

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
const updateJobs = (updates, options) => updateSlice('jobs', updates, options)

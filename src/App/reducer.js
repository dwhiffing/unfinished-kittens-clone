import u from 'updeep'
import data, { nameToIndex } from './utils/constants'

export const initialState = {
  loading: true,
  ...data,
}

const reducer = (state, action) => {
  if (action.type === 'SAVE') {
    localStorage.setItem('save', JSON.stringify(state))
    return state
  }

  if (action.type === 'RESET') {
    const shouldReset = window.confirm('sure?')
    if (shouldReset) {
      localStorage.removeItem('save')
      document.location.reload()
    }
    return state
  }

  if (action.type === 'LOAD') {
    const saveString = localStorage.getItem('save')
    const save = saveString ? JSON.parse(saveString) : data
    return u({ ...save, loading: false }, state)
  }

  if (action.type === 'TICK') {
    const foodPerTick =
      state.buildings[0].effects.foodPerTick * state.buildings[0].value

    return u(updateResources({ food: foodPerTick }), state)
  }

  if (action.type === 'GATHER_FOOD') {
    return u(updateResources({ food: 1 }), state)
  }

  if (action.type === 'BUY_BUILDING') {
    const { name, value, cost } = action.payload
    return u(
      {
        ...updateBuildings({ [name]: value }),
        ...updateResources(cost),
      },
      state
    )
  }
  return state
}

export default reducer

const updateSlice = (key, updates) => {
  const updateToPush = { [key]: {} }

  Object.keys(updates).forEach(resourceName => {
    const amount = updates[resourceName]
    const index = nameToIndex[key][resourceName]
    updateToPush[key][index] = resource => {
      let newValue = resource.value + amount

      // Enforce max if present
      if (typeof resource.max !== 'undefined' && newValue > resource.max) {
        newValue = resource.max
      }

      return {
        ...resource,
        value: newValue,
      }
    }
  })
  return updateToPush
}

const updateResources = updates => updateSlice('resources', updates)
const updateBuildings = updates => updateSlice('buildings', updates)

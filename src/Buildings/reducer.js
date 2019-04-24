import u from 'updeep'
import { updateSlice, loadSlice } from '../reducer'

const updateBuildings = (...args) => updateSlice('buildings', ...args)

const buildingsReducer = (state, action) => {
  if (action.type === 'LOAD') {
    return loadSlice('buildings', action.payload)
  }

  if (action.type === 'BUY_BUILDING') {
    const {
      building: { name },
      value,
    } = action.payload
    return u(updateBuildings({ [name]: value }, state), state).buildings
  }
  return state.buildings
}

export default buildingsReducer

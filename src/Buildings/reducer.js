import u from 'updeep'
import { updateSlice, loadSlice } from '../reducer'

const updateBuildings = (...args) => updateSlice('buildings', ...args)

const buildingsReducer = (state, { type, payload }) => {
  if (type === 'LOAD') {
    return loadSlice('buildings', payload)
  }

  if (type === 'BUY_BUILDING') {
    const { building, value } = payload
    return u(updateBuildings({ [building.name]: value }, state), state)
      .buildings
  }
  return state.buildings
}

export default buildingsReducer

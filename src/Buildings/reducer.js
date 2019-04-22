import u from 'updeep'
import data from '../App/constants'
import { updateSlice } from '../App/utils'

const updateBuildings = (...args) => updateSlice('buildings', ...args)

const buildingsReducer = (state, action) => {
  if (action.type === 'LOAD') {
    const update = [...data.buildings]
    action.payload.buildings.forEach((building, index) => {
      update[index].value = building[1]
    })
    return update
  }

  if (action.type === 'BUY_BUILDING') {
    const { name, value } = action.payload
    return u(updateBuildings({ [name]: value }, state), state).buildings
  }
  return state.buildings
}

export default buildingsReducer

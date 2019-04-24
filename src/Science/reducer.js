import u from 'updeep'
import { updateSlice, loadSlice } from '../reducer'

const updateScience = (...args) => updateSlice('science', ...args)

const scienceReducer = (state, action) => {
  if (action.type === 'LOAD') {
    return loadSlice('science', action.payload)
  }

  if (action.type === 'BUY_SCIENCE') {
    const { name } = action.payload
    return u(updateScience({ baskets: 1 }, state), state).science
  }
  return state.science
}

export default scienceReducer

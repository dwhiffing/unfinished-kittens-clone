import u from 'updeep'
import data from '../constants'
import { updateSlice } from '../reducer'

const updateScience = (...args) => updateSlice('science', ...args)

const scienceReducer = (state, action) => {
  if (action.type === 'LOAD') {
    const update = [...data.science]
    const science = action.payload.science || []
    science.forEach((science, index) => {
      update[index].value = science[1]
    })
    return update
  }

  if (action.type === 'BUY_SCIENCE') {
    const { name } = action.payload
    return u(updateScience({ [name]: 1 }, state), state).science
  }
  return state.science
}

export default scienceReducer

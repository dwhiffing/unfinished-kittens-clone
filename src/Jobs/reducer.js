import u from 'updeep'
import { updateSlice, loadSlice } from '../reducer'

const updateJobs = (...args) => updateSlice('jobs', ...args)

const jobsReducer = (state, action) => {
  if (action.type === 'LOAD') {
    return loadSlice('jobs', action.payload)
  }

  if (action.type === 'UPDATE_JOBS') {
    const { name, value } = action.payload
    return u(updateJobs({ [name]: value }, state), state).jobs
  }

  return state.jobs
}

export default jobsReducer

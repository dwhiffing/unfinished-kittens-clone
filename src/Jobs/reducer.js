import u from 'updeep'
import data from '../constants'
import { updateSlice } from '../utils'

const updateJobs = (...args) => updateSlice('jobs', ...args)

const jobsReducer = (state, action) => {
  if (action.type === 'LOAD') {
    const update = [...data.jobs]
    action.payload.jobs.forEach((job, index) => {
      update[index].value = job[1]
    })
    return update
  }

  if (action.type === 'UPDATE_JOBS') {
    const { name, value } = action.payload
    return u(updateJobs({ [name]: value }, state), state).jobs
  }

  return state.jobs
}

export default jobsReducer

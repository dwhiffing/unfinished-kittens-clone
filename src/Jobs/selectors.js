import { getModel, getUnlock } from '../selectors'
import { getResource } from '../resources/selectors'

export const getJob = (state, name) => getModel(state, 'jobs', name)

export const getJobs = state =>
  state.jobs.map(job => ({
    ...job,
    summary: getJobSummary(state, job),
    canAfford: getAvailableWorkers(state) > 0,
  }))

export const getUnlockedJobs = state =>
  getJobs(state).filter(({ name }) => !!getUnlock(state, name))

export const getTotalWorkers = state =>
  parseInt(getResource(state, 'folks').value)

export const getNumWorkers = state =>
  state.jobs.reduce((prev, curr) => prev + curr.value, 0)

export const getAvailableWorkers = state =>
  getTotalWorkers(state) - getNumWorkers(state)

const getJobSummary = (state, job) => {
  return `${job.effects
    .filter(({ type }) => type === 'resourcePerTick')
    .map(({ payload }) => `${payload.value * 5} ${payload.name} /sec`)}`
}

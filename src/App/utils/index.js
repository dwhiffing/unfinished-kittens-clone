export const getTotalWorkers = resources =>
  parseInt(resources.find(({ name }) => name === 'folks').value)

export const getNumWorkers = jobs =>
  jobs.reduce((prev, curr) => prev + curr.value, 0)

export const getAvailableWorkers = ({ jobs, resources }) =>
  getTotalWorkers(resources) - getNumWorkers(jobs)

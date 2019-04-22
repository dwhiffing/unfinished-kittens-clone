export const getResourcesGainedPerTick = (buildings, jobs) => {
  const obj = {}
  buildings.forEach((building, index) => {
    const resourceEffect = buildings[index].effects.find(
      effect => effect.type === 'resourcePerTick'
    )
    if (resourceEffect) {
      const {
        payload: { name, amount },
      } = resourceEffect
      obj[name] = amount * buildings[index].value
    }
  })
  jobs.forEach((job, index) => {
    const {
      payload: { name, amount },
    } = jobs[index].effects.find(effect => effect.type === 'resourcePerTick')
    obj[name] = amount * jobs[index].value
  })
  return obj
}

export const getTotalWorkers = resources =>
  parseInt(resources.find(({ name }) => name === 'folks').value)

export const getNumWorkers = jobs =>
  jobs.reduce((prev, curr) => prev + curr.value, 0)

export const getAvailableWorkers = ({ jobs, resources }) =>
  getTotalWorkers(resources) - getNumWorkers(jobs)

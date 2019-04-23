export const getResourcesGainedPerTick = (buildings, jobs) => {
  const obj = {}
  buildings.forEach((building, index) => {
    const resourceEffect = buildings[index].effects.find(
      effect => effect.type === 'resourcePerTick'
    )
    if (resourceEffect) {
      const {
        payload: { name, value },
      } = resourceEffect
      obj[name] = value * buildings[index].value
    }
  })
  jobs.forEach((job, index) => {
    const {
      payload: { name, value },
    } = jobs[index].effects.find(effect => effect.type === 'resourcePerTick')
    obj[name] = obj[name] || 0
    obj[name] += value * jobs[index].value
  })
  return obj
}

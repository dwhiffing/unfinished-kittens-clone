export const getResourcesGainedPerTick = (buildings, jobs) => {
  const obj = {}
  buildings.forEach((building, index) => {
    const {
      payload: { name, amount },
    } = buildings[index].effects.find(
      effect => effect.type === 'resourcePerTick'
    )
    obj[name] = amount * buildings[index].value
  })
  jobs.forEach((job, index) => {
    const {
      payload: { name, amount },
    } = jobs[index].effects.find(effect => effect.type === 'resourcePerTick')
    obj[name] = amount * jobs[index].value
  })
  return obj
}

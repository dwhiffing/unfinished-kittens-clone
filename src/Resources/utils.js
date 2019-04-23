export const getResourcesGainedPerTick = (buildings, jobs) => {
  const obj = {}
  buildings.concat(jobs).forEach(thing => {
    thing.effects
      .filter(effect => effect.type === 'resourcePerTick')
      .forEach(({ payload: { name, value } }) => {
        obj[name] = obj[name] || 0
        obj[name] = value * thing.value
      })
  })
  return obj
}

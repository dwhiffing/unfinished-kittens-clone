export const getResourcesGainedPerTick = ({ resources, buildings, jobs }) => {
  const obj = {}
  resources
    .concat(buildings)
    .concat(jobs)
    .forEach(({ effects = [], value: numberOfThing }) => {
      effects
        .filter(effect => effect.type === 'resourcePerTick')
        .forEach(({ payload: { name, value, multiply = true } }) => {
          obj[name] = obj[name] || 0
          const finalValue = multiply ? value * numberOfThing : value
          obj[name] += finalValue
        })
    })
  return obj
}

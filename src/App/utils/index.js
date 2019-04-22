export const getResourcesGainedPerTick = buildings => {
  const obj = {}
  buildings.forEach((building, index) => {
    const {
      payload: { name, amount },
    } = buildings[index].effects.find(
      effect => effect.type === 'resourcePerTick'
    )
    obj[name] = amount * buildings[index].value
  })
  return obj
}

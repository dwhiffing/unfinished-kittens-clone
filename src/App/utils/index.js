export const canAfford = (prices = {}, resources) => {
  let canAfford = true
  Object.keys(prices).forEach(priceKey => {
    const resource = resources.find(resource => resource.name === priceKey)
    if (resource.value - prices[priceKey] < 0) {
      canAfford = false
    }
  })
  return canAfford
}

export const getPerTick = buildings => {
  const obj = {}
  buildings.forEach((building, index) => {
    const {
      payload: { name, amount },
    } = buildings[index].effects.find(
      effect => effect.name === 'resourcePerTick'
    )
    obj[name] = amount * buildings[index].value
  })
  return obj
}

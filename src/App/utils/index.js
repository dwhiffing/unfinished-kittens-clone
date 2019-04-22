export const canAfford = (prices, resources) => {
  let canAfford = true
  Object.keys(prices).forEach(priceKey => {
    const resource = resources.find(resource => resource.name === priceKey)
    if (resource.value < prices[priceKey]) {
      canAfford = false
    }
  })
  return canAfford
}

export const getPerTick = buildings => {
  const obj = {}
  buildings.forEach((building, index) => {
    const thing = buildings[index].effects.resourcePerTick
    obj[thing.name] = thing.amount * buildings[index].value
  })
  return obj
}

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

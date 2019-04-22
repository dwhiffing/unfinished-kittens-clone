const data = [
  {
    // label, description, unlockRatio, unlockable, priceRatio, flavor
    name: 'farm',
    value: 0,
    prices: { food: 10 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', amount: 0.125 } },
    ],
  },
  {
    name: 'house',
    value: 0,
    prices: { wood: 5 },
    effects: [
      { type: 'maxResource', payload: { name: 'folks', amount: 2 } },
      { type: 'resourcePerTick', payload: { name: 'folks', amount: 0.0125 } },
    ],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  isUnlocked(resources) {
    return Object.entries(this.prices).every(([resourceName, price]) => {
      const currentResource = resources.find(r => r.name === resourceName).value
      return currentResource > price / 2
    })
  },
  getNextCost() {
    const obj = {}

    Object.entries(this.prices || {}).forEach(([resource, price]) => {
      obj[resource] = price * Math.pow(1.12, this.value)
    })

    return obj
  },
  getCanAfford(resources) {
    return (
      Object.entries(this.getNextCost()).filter(([resourceName, cost]) => {
        const resource = resources.find(({ name }) => name === resourceName)
        return resource.value - cost < 0
      }).length === 0
    )
  },
}))

export default hydratedData

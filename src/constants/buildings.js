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
]

const hydratedData = data.map(obj => ({
  ...obj,
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

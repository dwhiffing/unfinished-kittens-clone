const data = [
  {
    name: 'hut',
    value: 0,
    prices: { wood: 10 },
    unlockRequirements: { wood: 5 },
    tab: 'shelter',
    effects: [
      { type: 'maxResource', payload: { name: 'folks', value: 2 } },
      { type: 'resourcePerTick', payload: { name: 'folks', value: 0.0125 } },
    ],
  },
  {
    // label, description, unlockRatio, unlockable, priceRatio, flavor
    name: 'field',
    tab: 'farm',
    value: 0,
    prices: { food: 2000 },
    unlockRequirements: { food: 1500 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.125 } },
    ],
  },
  {
    name: 'Lumberhouse',
    tab: 'forestry',
    value: 0,
    prices: { wood: 100 },
    unlockRequirements: { wood: 75 },
    effects: [{ type: 'maxResource', payload: { name: 'wood', value: 100 } }],
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
      Object.entries(this.getNextCost()).filter(([resourceName, prices]) => {
        const resource = resources.find(({ name }) => name === resourceName)
        return resource.value - prices < 0
      }).length === 0
    )
  },
}))

export default hydratedData

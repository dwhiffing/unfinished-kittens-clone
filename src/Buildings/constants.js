const data = [
  {
    name: 'hut',
    value: 0,
    prices: { wood: 10 },
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
    prices: { food: 10 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.125 } },
    ],
  },
  {
    name: 'Lumberhouse',
    tab: 'forestry',
    value: 0,
    prices: { wood: 10 },
    effects: [{ type: 'maxResource', payload: { name: 'wood', value: 100 } }],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  isUnlocked({ resources }) {
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
      Object.entries(this.getNextCost()).filter(([resourceName, prices]) => {
        const resource = resources.find(({ name }) => name === resourceName)
        return resource.value - prices < 0
      }).length === 0
    )
  },
}))

export default hydratedData

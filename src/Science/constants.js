const data = [
  {
    name: 'calendar',
    prices: { science: 10 },
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', amount: 0.125 } },
    ],
  },
  {
    name: 'archery',
    prices: { science: 50 },
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', amount: 100 } },
    ],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  isUnlocked(resources) {
    return Object.entries(this.prices).every(([resourceName, price]) => {
      const currentResource = resources.find(r => r.name === resourceName).value
      return currentResource > price / 2 || price <= 10
    })
  },
  getCanAfford(resources) {
    return (
      Object.entries(this.prices).filter(([resourceName, prices]) => {
        const resource = resources.find(({ name }) => name === resourceName)
        return resource.value - prices < 0
      }).length === 0
    )
  },
}))

export default hydratedData

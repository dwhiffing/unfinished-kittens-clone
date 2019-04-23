const data = [
  {
    name: 'agriculture',
    prices: { science: 0 },
    value: 1,
    effects: [{ type: 'unlockJob', payload: { name: 'farmer' } }],
  },
  {
    name: 'woodcutting',
    prices: { science: 10 },
    value: 0,
    effects: [{ type: 'unlockJob', payload: { name: 'woodcutter' } }],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  isUnlocked({ resources }) {
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

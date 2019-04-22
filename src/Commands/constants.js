const data = [
  {
    name: 'Gather food',
    color: '#e6cc3b',
    effects: [{ type: 'updateResources', payload: { food: 1 } }],
  },
  {
    name: '50 food -> 1 wood',
    color: '#b7612c',
    effects: [
      { type: 'updateResources', payload: { food: -50 } },
      { type: 'updateResources', payload: { wood: 1 } },
    ],
  },
  {
    name: 'Reset',
    effects: [
      {
        type: 'resetSave',
      },
    ],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  getPrices() {
    let prices = {}
    let effects = this.effects || []
    effects.forEach(effect => {
      effect.payload &&
        Object.entries(effect.payload).forEach(([resourceKey, price]) => {
          if (price < 0) {
            prices[resourceKey] = -price
          }
        })
    })
    return prices
  },
  getCanAfford(resources) {
    return (
      Object.entries(this.getPrices()).filter(([resourceName, cost]) => {
        const resource = resources.find(({ name }) => name === resourceName)
        const value = resource.value - cost
        return value < 0
      }).length === 0
    )
  },
}))

export default hydratedData

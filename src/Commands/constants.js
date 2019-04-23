const data = [
  {
    name: 'Scavenge',
    color: '#e6cc3b',
    tab: 'shelter',
    summaryLabel: 'Scavenge some food',
    effects: [
      {
        type: 'updateResources',
        payload: {
          food: [2, 4, 5, 6, 8, 10],
          wood: [0, 0, 0, 0, 0, 0, 0, 0.1],
        },
      },
    ],
  },
  {
    name: 'Farm',
    color: '#e6cc3b',
    tab: 'farm',
    effects: [{ type: 'updateResources', payload: { food: 50 } }],
  },
  {
    name: 'Lumber',
    color: '#e6cc3b',
    tab: 'forestry',
    effects: [{ type: 'updateResources', payload: { wood: 50 } }],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  summary() {
    if (this.summaryLabel) {
      return this.summaryLabel
    }
    return this.effects
      .filter(({ type, payload }) => type === 'updateResources')
      .map(effect => Object.entries(effect.payload))
      .join('')
  },
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
      Object.entries(this.getPrices()).filter(([resourceName, prices]) => {
        const resource = resources.find(({ name }) => name === resourceName)
        const value = resource.value - prices
        return value < 0
      }).length === 0
    )
  },
}))

export default hydratedData

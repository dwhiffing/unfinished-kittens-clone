const data = [
  {
    name: 'Scavenge',
    color: '#e6cc3b',
    tab: 'shelter',
    effects: [{ type: 'updateResources', payload: { food: 5, wood: 5 } }],
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
    return this.effects
      .filter(({ type, payload }) => type === 'updateResources')
      .map(effect => Object.entries(effect.payload))
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

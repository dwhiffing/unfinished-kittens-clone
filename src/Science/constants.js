const data = [
  {
    name: 'baskets',
    tab: 'shelter',
    prices: { food: 200, wood: 5 },
    unlockRequirements: { food: 100, wood: 2 },
    value: 0,
    effects: [
      { type: 'improveCommand', payload: { name: 'scavenge', value: 2 } },
    ],
  },
  {
    name: 'hoes',
    tab: 'farm',
    prices: { food: 2000, wood: 100 },
    unlockRequirements: { food: 1500, wood: 65 },
    value: 0,
    effects: [
      { type: 'improveCommand', payload: { name: 'harvest', value: 2 } },
    ],
  },
  {
    name: 'axes',
    tab: 'forestry',
    prices: { food: 5000, wood: 100 },
    unlockRequirements: { food: 3000, wood: 80 },
    value: 0,
    effects: [{ type: 'improveCommand', payload: { name: 'chop', value: 2 } }],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
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

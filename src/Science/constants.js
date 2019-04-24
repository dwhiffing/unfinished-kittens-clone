export default [
  {
    name: 'baskets',
    tab: 'shelter',
    prices: { food: 200, wood: 5 },
    unlockRequirements: { food: 100, wood: 2 },
    value: 0,
    effects: [
      { type: 'improveCommand', payload: { name: 'scavenge', value: 10 } },
    ],
  },
]

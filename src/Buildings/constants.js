export default [
  {
    name: 'hut',
    value: 0,
    prices: { wood: 5 },
    unlockRequirements: { wood: 1 },
    tab: 'shelter',
    effects: [
      { type: 'maxResource', payload: { name: 'folks', value: 2 } },
      { type: 'resourcePerTick', payload: { name: 'folks', value: 0.0125 } },
    ],
  },
  {
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

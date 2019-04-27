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
    name: 'farm',
    tab: 'shelter',
    value: 0,
    prices: { wood: 2 },
    unlockRequirements: { wood: 1 },
    effects: [{ type: 'maxResource', payload: { name: 'food', value: 100 } }],
  },
  {
    name: 'lumbermill',
    tab: 'shelter',
    value: 0,
    prices: { wood: 5 },
    unlockRequirements: { wood: 2.5 },
    effects: [{ type: 'maxResource', payload: { name: 'wood', value: 100 } }],
  },
]

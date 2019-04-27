export default [
  {
    name: 'baskets',
    tab: 'shelter',
    prices: { wood: 0.1 },
    unlockRequirements: { wood: 0.1 },
    value: 0,
    effects: [{ type: 'improveJob', payload: { name: 'scavenge', value: 10 } }],
  },
  {
    name: 'nets',
    tab: 'shelter',
    prices: { wood: 0.1 },
    unlockRequirements: { wood: 0.1 },
    value: 0,
    effects: [{ type: 'improveJob', payload: { name: 'twigs', value: 10 } }],
  },
  {
    name: 'hoe',
    tab: 'shelter',
    prices: { wood: 0.1 },
    unlockRequirements: { farm: 1 },
    value: 0,
    effects: [{ type: 'improveJob', payload: { name: 'farmer', value: 2 } }],
  },
  {
    name: 'axe',
    tab: 'shelter',
    prices: { wood: 0.1 },
    unlockRequirements: { lumbermill: 1 },
    value: 0,
    effects: [{ type: 'improveJob', payload: { name: 'chop', value: 2 } }],
  },
]

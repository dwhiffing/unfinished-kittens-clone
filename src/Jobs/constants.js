export default [
  {
    name: 'scavenge',
    value: 0,
    tab: 'shelter',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.4 } },
    ],
  },
  {
    name: 'twigs',
    value: 0,
    tab: 'shelter',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.0075 } },
    ],
  },
  {
    name: 'farmer',
    tab: 'shelter',
    value: 0,
    unlockRequirements: { farm: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.2 } },
    ],
  },
  {
    name: 'chop',
    tab: 'shelter',
    value: 0,
    unlockRequirements: { lumbermill: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.02 } },
    ],
  },
]

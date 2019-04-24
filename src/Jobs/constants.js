export default [
  {
    name: 'scavenger',
    value: 0,
    tab: 'shelter',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.034 } },
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.034 } },
    ],
  },
  {
    name: 'farmer',
    tab: 'farm',
    value: 0,
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.2 } },
    ],
  },
  {
    name: 'woodcutter',
    tab: 'forestry',
    value: 0,
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.02 } },
    ],
  },
]

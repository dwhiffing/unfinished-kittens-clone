export default [
  {
    name: 'hunt',
    value: 0,
    tab: 'forest',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 1.2 } },
    ],
  },
  {
    name: 'scavenge',
    value: 0,
    tab: 'forest',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.03 } },
    ],
  },
  {
    name: 'farm',
    value: 0,
    max: 0,
    tab: 'field',
    unlockRequirements: { plot: 1 },
    effects: [{ type: 'resourcePerTick', payload: { name: 'food', value: 2 } }],
  },
]

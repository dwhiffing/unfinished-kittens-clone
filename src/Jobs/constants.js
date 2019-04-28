export default [
  {
    name: 'hunt',
    value: 0,
    tab: 'forest',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.3 } },
    ],
  },
  {
    name: 'scavenge',
    value: 0,
    tab: 'forest',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.02 } },
    ],
  },
  // {
  //   name: 'farm',
  //   value: 0,
  //   tab: 'field',
  //   unlockRequirements: { plot: 1 },
  //   effects: [
  //     { type: 'resourcePerTick', payload: { name: 'food', value: 0.5 } },
  //   ],
  // },
]

export default [
  {
    name: 'hunter',
    value: 0,
    tab: 'forest',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 1.2 } },
    ],
  },
  {
    name: 'scavenger',
    value: 0,
    tab: 'forest',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.03 } },
    ],
  },
  {
    name: 'farmer',
    value: 0,
    max: 0,
    tab: 'field',
    unlockRequirements: { plot: 1 },
    effects: [{ type: 'resourcePerTick', payload: { name: 'food', value: 2 } }],
  },
  {
    name: 'lumberjack',
    value: 0,
    max: 0,
    tab: 'forest',
    unlockRequirements: { woodmill: 1 },
    effects: [{ type: 'resourcePerTick', payload: { name: 'wood', value: 1 } }],
  },
  {
    name: 'miner',
    value: 0,
    max: 0,
    tab: 'hill',
    unlockRequirements: { mine: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'stone', value: 0.1 } },
    ],
  },
]

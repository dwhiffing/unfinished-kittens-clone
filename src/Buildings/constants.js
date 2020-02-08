export default [
  {
    name: 'baskets',
    value: 1,
    max: 10,
    ratio: 1,
    prices: { wood: 10 },
    tab: 'forest',
    effects: [
      { type: '+max', payload: { name: 'food', value: 100 } },
      { type: '+max', payload: { name: 'wood', value: 10 } },
    ],
  },
  {
    name: 'hut',
    value: 1,
    prices: { wood: 50 },
    ratio: 1,
    max: 5,
    tab: 'forest',
    effects: [{ type: '+max', payload: { name: 'folks', value: 1 } }],
  },
  {
    name: 'plot',
    tab: 'field',
    max: 5,
    value: 0,
    ratio: 1,
    prices: { food: 500, wood: 100 },
    effects: [{ type: '+max', payload: { name: 'farmer', value: 1 } }],
  },
  {
    name: 'silo',
    tab: 'field',
    max: 10,
    value: 0,
    ratio: 1,
    prices: { wood: 100 },
    unlockRequirements: { plot: 2 },
    effects: [{ type: '+max', payload: { name: 'food', value: 250 } }],
  },
  {
    name: 'box',
    tab: 'forest',
    max: 5,
    value: 0,
    ratio: 1,
    prices: { wood: 100 },
    unlockRequirements: { silo: 1 },
    effects: [
      { type: '+max', payload: { name: 'wood', value: 50 } },
      { type: '+max', payload: { name: 'stone', value: 10 } },
    ],
  },
  {
    name: 'mine',
    tab: 'hill',
    max: 5,
    value: 0,
    ratio: 1,
    prices: { wood: 300 },
    unlockRequirements: { wood: 300 },
    effects: [{ type: '+max', payload: { name: 'miner', value: 1 } }],
  },
  {
    name: 'woodmill',
    tab: 'forest',
    max: 5,
    value: 0,
    ratio: 1,
    prices: { stone: 10 },
    unlockRequirements: { stone: 1 },
    effects: [{ type: '+max', payload: { name: 'lumberjack', value: 1 } }],
  },
]

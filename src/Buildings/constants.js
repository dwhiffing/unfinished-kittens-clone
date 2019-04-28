export default [
  {
    name: 'baskets',
    value: 0,
    max: 10,
    ratio: 1,
    prices: { wood: 10 },
    unlockRequirements: { wood: 5 },
    tab: 'forest',
    effects: [
      { type: 'maxResource', payload: { name: 'food', value: 50 } },
      { type: 'maxResource', payload: { name: 'wood', value: 10 } },
    ],
  },
  {
    name: 'hut',
    value: 0,
    prices: { wood: 50 },
    ratio: 1,
    max: 10,
    unlockRequirements: { wood: 25 },
    tab: 'forest',
    effects: [{ type: 'maxResource', payload: { name: 'folks', value: 1 } }],
  },
  {
    name: 'lumbermill',
    tab: 'forest',
    value: 0,
    max: 10,
    prices: { wood: 200 },
    unlockRequirements: { wood: 200 },
    effects: [
      { type: 'maxResource', payload: { name: 'wood', value: 100 } },
      { type: 'improveJob', payload: { name: 'lumber', value: 1.2 } },
    ],
  },
  {
    name: 'plot',
    tab: 'field',
    max: 10,
    value: 0,
    ratio: 1,
    prices: { wood: 50 },
    effects: [
      { type: 'maxResource', payload: { name: 'food', value: 200 } },
      { type: 'improveJob', payload: { name: 'farm', value: 1.2 } },
    ],
  },
]

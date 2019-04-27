export default [
  {
    name: 'baskets',
    tab: 'shelter',
    prices: { wood: 10 },
    unlockRequirements: { wood: 6 },
    value: 0,
    effects: [
      { type: 'improveCommand', payload: { name: 'scavenge', value: 2 } },
    ],
  },
  {
    name: 'nets',
    tab: 'shelter',
    prices: { wood: 5 },
    unlockRequirements: { wood: 1.5 },
    value: 0,
    effects: [
      { type: 'improveCommand', payload: { name: 'scavenge', value: 2 } },
    ],
  },
  {
    name: 'rucksack',
    tab: 'shelter',
    prices: { wood: 1 },
    unlockRequirements: { wood: 0.25 },
    value: 0,
    effects: [
      { type: 'improveCommand', payload: { name: 'scavenge', value: 2 } },
    ],
  },
]

export default [
  {
    name: 'hunt+',
    tab: 'forest',
    labels: ['spear', 'sharper spear', 'sword'],
    max: 3,
    ratio: 3,
    prices: { wood: 3 },
    unlockRequirements: { wood: 0.5 },
    value: 0,
    effects: [{ type: 'improveJob', payload: { name: 'hunt', value: 1.5 } }],
  },
  {
    name: 'scavenge+',
    labels: ['rucksack', 'bigger rucksack', 'axe'],
    max: 3,
    tab: 'forest',
    ratio: 3,
    prices: { wood: 5 },
    unlockRequirements: { wood: 2.5 },
    value: 0,
    effects: [{ type: 'improveJob', payload: { name: 'scavenge', value: 4 } }],
  },
]

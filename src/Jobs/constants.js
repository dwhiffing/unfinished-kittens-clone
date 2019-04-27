export default [
  {
    name: 'scavenger',
    value: 0,
    tab: 'shelter',
    unlockRequirements: { folks: 1 },
    effects: [{ type: 'performJob', payload: { name: 'scavenge' } }],
  },
  {
    name: 'farmer',
    tab: 'farm',
    value: 0,
    unlockRequirements: { folks: 1 },
    effects: [{ type: 'performJob', payload: { name: 'food' } }],
  },
  {
    name: 'woodcutter',
    tab: 'forestry',
    value: 0,
    unlockRequirements: { folks: 1 },
    effects: [{ type: 'performJob', payload: { name: 'wood' } }],
  },
]

export default [
  {
    name: 'scavenge',
    color: '#e6cc3b',
    tab: 'shelter',
    effects: [
      {
        type: 'updateResources',
        payload: {
          food: [0.5, 0.75, 1],
          wood: [0.01, 0.05, 0.1],
        },
      },
    ],
  },
  {
    name: 'harvest',
    color: '#e6cc3b',
    tab: 'farm',
    effects: [{ type: 'updateResources', payload: { food: 50 } }],
  },
  {
    name: 'chop',
    color: '#e6cc3b',
    tab: 'forestry',
    effects: [{ type: 'updateResources', payload: { wood: 50 } }],
  },
]

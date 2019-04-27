export default [
  // {
  //   name: 'scavenge',
  //   color: '#e6cc3b',
  //   tab: 'shelter',
  //   effects: [
  //     {
  //       type: 'updateResources',
  //       payload: {
  //         food: [0.625, 0.8, 1.25],
  //         wood: [0.0125, 0.06, 0.125],
  //       },
  //     },
  //   ],
  // },
  {
    name: 'harvest',
    color: '#e6cc3b',
    tab: 'farm',
    effects: [{ type: 'updateResources', payload: { food: 50 } }],
  },
  {
    name: 'chops',
    color: '#e6cc3b',
    tab: 'forestry',
    effects: [{ type: 'updateResources', payload: { wood: 50 } }],
  },
]

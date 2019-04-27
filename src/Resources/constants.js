export default [
  {
    // title, type(common, rare, etc), visible, calculatePerTick, color
    name: 'food',
    value: 80,
    max: 100,
    color: '#e6cc3b',
    visible: true,
    effects: [
      {
        type: 'resourcePerTick',
        payload: { name: 'folks', value: 0.01, useMultiplier: false },
      },
    ],
  },
  {
    name: 'wood',
    value: 0,
    unlockRequirements: { wood: 0.01 },
    color: '#b7612c',
    max: 10,
  },
  {
    name: 'folks',
    value: 1,
    color: 'purple',
    max: 1,
    effects: [
      {
        type: 'resourcePerTick',
        payload: { name: 'food', value: -0.2 },
      },
      {
        type: 'resourcePerTick',
        payload: { name: 'folks', value: -0.005, useMultiplier: false },
      },
    ],
  },
]

export const CHEAT_FACTOR = 1

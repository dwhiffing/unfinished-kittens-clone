export const CHEAT_FACTOR = 2

export default [
  {
    // title, type(common, rare, etc), visible, calculatePerTick, color
    name: 'food',
    value: 50,
    max: 0,
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
    max: 0,
  },
  {
    name: 'stone',
    value: 0,
    unlockRequirements: { stone: 0.01 },
    color: '#999999',
    max: 0,
  },
  {
    name: 'folks',
    value: 1,
    color: 'purple',
    max: 0,
    effects: [
      {
        type: 'resourcePerTick',
        payload: { name: 'food', value: -0.8 / CHEAT_FACTOR, integer: true },
      },
      {
        type: 'resourcePerTick',
        payload: { name: 'folks', value: -0.005, useMultiplier: false },
      },
    ],
  },
]

export default [
  {
    // title, type(common, rare, etc), visible, calculatePerTick, color
    name: 'food',
    value: 100,
    max: 5000,
    color: '#e6cc3b',
    visible: true,
  },
  {
    name: 'wood',
    value: 0,
    unlockRequirements: { wood: 0.01 },
    color: '#b7612c',
    max: 500,
  },
  {
    name: 'folks',
    unlockRequirements: { folks: 0.01 },
    value: 0,
    color: 'purple',
    max: 0,
  },
]

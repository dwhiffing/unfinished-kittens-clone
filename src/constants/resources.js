const data = [
  {
    // title, type(common, rare, etc), visible, calculatePerTick, color
    name: 'food',
    value: 0,
    max: 5000,
    color: '#e6cc3b',
    visible: true,
  },
  {
    name: 'wood',
    value: 0,
    color: '#b7612c',
    max: 100,
  },
  {
    name: 'folks',
    value: 0,
    color: 'purple',
    max: 0,
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  isUnlocked() {
    return this.value > 0
  },
}))

export default hydratedData

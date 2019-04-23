const data = [
  {
    // title, type(common, rare, etc), visible, calculatePerTick, color
    name: 'food',
    value: 500,
    max: 5000,
    color: '#e6cc3b',
    visible: true,
    effects: [
      {
        type: 'resourcePerTick',
        payload: { name: 'food', value: -0.35, multiply: false },
      },
    ],
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
  getMax(buildings) {
    const extra = buildings.reduce((prev, curr) => {
      const effect = curr.effects.find(
        e => e.type === 'maxResource' && e.payload.name === this.name
      )
      return effect ? effect.payload.value * curr.value + prev : prev
    }, 0)
    return this.max + extra
  },
}))

export default hydratedData

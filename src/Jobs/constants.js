const data = [
  {
    name: 'farmer',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.5 } },
    ],
  },
  {
    name: 'woodcutter',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.02 } },
    ],
  },
  {
    name: 'scavenger',
    value: 0,
    tab: 'shelter',
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.034 } },
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.034 } },
    ],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  summary() {
    return `${this.effects
      .filter(({ type }) => type === 'resourcePerTick')
      .map(({ payload }) => `${payload.value * 5} ${payload.name} /sec`)}`
  },
  isUnlocked(state) {
    let isUnlocked = true
    return isUnlocked
  },
}))

export default hydratedData

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
    name: 'hunter',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'manpower', value: 0.034 } },
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
  isUnlocked({ buildings }) {
    let isUnlocked = false
    const things = buildings.filter(thing => thing.value > 0)
    things.forEach(thing => {
      thing.effects.forEach(effect => {
        if (
          thing.value > 0 &&
          effect.type === 'unlockJob' &&
          effect.payload.name === this.name
        ) {
          isUnlocked = true
        }
      })
    })
    return isUnlocked
  },
}))

export default hydratedData

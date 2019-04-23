const data = [
  {
    name: 'farmer',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.5 } },
    ],
  },
  {
    name: 'scientist',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'science', value: 0.02 } },
    ],
  },
  {
    name: 'woodcutter',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.02 } },
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
  isUnlocked({ buildings, science }) {
    let isUnlocked = false
    const things = buildings.concat(science).filter(thing => thing.value > 0)
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

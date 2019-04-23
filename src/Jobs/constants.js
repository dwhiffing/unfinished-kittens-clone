const data = [
  {
    name: 'scavenger',
    value: 0,
    tab: 'shelter',
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.034 } },
      { type: 'resourcePerTick', payload: { name: 'wood', value: 0.034 } },
    ],
  },
  {
    name: 'farmer',
    tab: 'farm',
    value: 0,
    unlockRequirements: { folks: 1 },
    effects: [
      { type: 'resourcePerTick', payload: { name: 'food', value: 0.5 } },
    ],
  },
  {
    name: 'woodcutter',
    tab: 'forestry',
    value: 0,
    unlockRequirements: { folks: 1 },
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
  isUnlocked({ resources }) {
    return (
      Object.entries(this.unlockRequirements).filter(
        ([resourceName, price]) => {
          const resource = resources.find(({ name }) => name === resourceName)
          return resource.value - price < 0
        }
      ).length === 0
    )
  },
}))

export default hydratedData

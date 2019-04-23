const data = [
  {
    name: 'shelter',
  },
  {
    name: 'farm',
    unlockRequirements: {
      food: 1000,
    },
  },
  {
    name: 'forestry',
    unlockRequirements: {
      wood: 100,
    },
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
  isUnlocked({ resources }) {
    if (!this.unlockRequirements) {
      return true
    }
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

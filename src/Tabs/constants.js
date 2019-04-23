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
      wood: 50,
    },
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
}))

export default hydratedData

const data = [
  {
    name: 'Woodcutter',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', amount: 0.02 } },
    ],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
}))

export default hydratedData

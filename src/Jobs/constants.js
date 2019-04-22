const data = [
  {
    name: 'Woodcutter',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'wood', amount: 0.02 } },
    ],
  },
  {
    name: 'Scientist',
    value: 0,
    effects: [
      { type: 'resourcePerTick', payload: { name: 'science', amount: 0.02 } },
    ],
  },
]

const hydratedData = data.map(obj => ({
  ...obj,
}))

export default hydratedData

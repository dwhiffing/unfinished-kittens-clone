export default {
  resources: [
    {
      // title, type(common, rare, etc), visible, calculatePerTick, color
      name: 'food',
      value: 0,
      max: 5000,
      visible: true,
    },
    {
      name: 'wood',
      value: 0,
      max: 100,
    },
  ],
  buildings: [
    {
      // label, description, unlockRatio, unlockable, priceRatio, flavor
      name: 'farm',
      value: 0,
      prices: { food: 10 },
      effects: [
        { type: 'resourcePerTick', payload: { name: 'food', amount: 0.125 } },
      ],
    },
  ],
  commands: [
    {
      name: 'Gather food',
      effects: [{ type: 'UPDATE_RESOURCES', payload: { food: 1 } }],
    },
    {
      name: 'Refine food',
      prices: { food: 100 },
      effects: [{ type: 'UPDATE_RESOURCES', payload: { wood: 1 } }],
    },
    {
      name: 'Reset',
      effects: [
        {
          type: 'RESET_SAVE',
        },
      ],
    },
  ],
}

export const TICK_DURATION = 200

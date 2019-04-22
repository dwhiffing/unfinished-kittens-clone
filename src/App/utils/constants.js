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
      prices: [
        {
          name: 'food',
          amount: 10,
          ratio: 1.12,
        },
      ],
      effects: {
        resourcePerTick: { name: 'food', amount: 0.125 },
      },
    },
  ],
}

export const TICK_DURATION = 200

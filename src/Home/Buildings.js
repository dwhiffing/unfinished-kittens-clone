import React from 'react'

const getNextCost = (building, { negated = false } = {}) => {
  const obj = {}

  Object.keys(building.prices).forEach(priceKey => {
    const price = building.prices[priceKey]
    const amount = price * Math.pow(1.12, building.value)
    obj[priceKey] = negated ? -amount : amount
  })

  return obj
}

const Slat = ({ label, onClick, color = 'white' }) => (
  <div onClick={onClick}>
    <p style={{ color }}>{label}</p>
  </div>
)

const Buildings = ({ resources, buildings, buyBuilding }) =>
  buildings.map(building => {
    const foodCost = getNextCost(building).food
    const canAfford = resources[0].value >= foodCost
    return (
      <Slat
        key={building.name}
        color={canAfford ? 'white' : 'red'}
        label={`${building.name} - ${building.value} cost: ${foodCost.toFixed(
          2
        )}`}
        onClick={() =>
          canAfford &&
          buyBuilding({
            name: building.name,
            value: 1,
            cost: getNextCost(building, { negated: true }),
          })
        }
      />
    )
  })

export default Buildings

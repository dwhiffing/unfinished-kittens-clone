import React from 'react'

const Slat = ({ label, onClick, color = 'white' }) => (
  <div onClick={onClick}>
    <p style={{ color }}>{label}</p>
  </div>
)

const Buildings = ({ resources, buildings, buyBuilding }) =>
  buildings.map(building => {
    const foodCost = building.getNextCost().food
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
            cost: building.getNextCost({ negated: true }),
          })
        }
      />
    )
  })

export default Buildings

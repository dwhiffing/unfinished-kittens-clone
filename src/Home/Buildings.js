import React from 'react'
import { getCanAfford } from '../App/utils'

const getNextCost = (building, { negated = false } = {}) => {
  const obj = {}

  Object.keys(building.prices).forEach(priceKey => {
    const price = building.prices[priceKey]
    const amount = price * Math.pow(1.12, building.value)
    obj[priceKey] = negated ? -amount : amount
  })

  return obj
}

const Building = ({ name, value, onClick, canAfford, prices }) => (
  <div className="button building" onClick={onClick}>
    <p style={{ color: canAfford ? 'white' : 'red' }}>
      {name} ({value})
    </p>
    {Object.keys(prices).map(resourceName => (
      <p
        key={`key-${resourceName}`}
        style={{ color: canAfford ? 'white' : 'red' }}>
        {resourceName}: {prices[resourceName].toFixed(2)}
      </p>
    ))}
  </div>
)

const Buildings = ({ resources, buildings, buyBuilding }) =>
  buildings.map(building => {
    const prices = getNextCost(building)
    const canAfford = getCanAfford(prices, resources)
    return (
      <Building
        key={building.name}
        {...building}
        prices={prices}
        canAfford={canAfford}
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

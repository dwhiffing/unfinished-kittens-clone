import React from 'react'

const Building = ({ name, value, onClick, canAfford, prices }) => (
  <div className="button building" onClick={onClick}>
    <p style={{ color: canAfford ? 'white' : 'red' }}>
      {name} ({value})
    </p>
    {Object.entries(prices).map(([resourceName, price]) => (
      <p
        key={`key-${resourceName}`}
        style={{ color: canAfford ? 'white' : 'red' }}>
        {resourceName}: {price.toFixed(2)}
      </p>
    ))}
  </div>
)

const Buildings = ({ resources, buildings, buyBuilding }) =>
  buildings.map(building => (
    <Building
      key={building.name}
      {...building}
      prices={building.getNextCost()}
      canAfford={building.getCanAfford(resources)}
      onClick={() =>
        building.getCanAfford(resources) &&
        buyBuilding({
          name: building.name,
          value: 1,
          cost: building.getNextCost(),
        })
      }
    />
  ))

export default Buildings

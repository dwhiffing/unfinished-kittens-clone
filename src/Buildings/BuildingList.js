import { connect } from '../storeContext'
import React from 'react'
import { getUnlockedBuildings } from './selectors'

const mapStateToProps = state => ({
  buildings: getUnlockedBuildings(state),
})

const mapDispatchToProps = dispatch => ({
  buyBuilding: building =>
    dispatch({ type: 'BUY_BUILDING', payload: { building, value: 1 } }),
})

const BuildingsList = ({ tab, buildings, buyBuilding }) =>
  buildings
    .filter(building => !tab || building.tab === tab)
    .map(building => (
      <Building
        key={building.name}
        {...building}
        canAfford={building.canAfford && !building.isMaxed}
        onClick={() => building.canAfford && buyBuilding(building)}
      />
    ))

const Building = ({ name, max, value, onClick, canAfford, prices }) => (
  <div className="button building" onClick={onClick}>
    <p style={{ color: canAfford ? 'white' : 'red' }}>
      {name} ({value}/{max})
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingsList)

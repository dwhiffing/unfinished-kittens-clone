import React from 'react'
import BuildingsList from './BuildingsList'

const BuildingsView = ({ unlocks, buildings, resources, buyBuilding }) => (
  <BuildingsList
    resources={resources}
    buildings={buildings}
    unlocks={unlocks}
    buyBuilding={buyBuilding}
  />
)

export default BuildingsView

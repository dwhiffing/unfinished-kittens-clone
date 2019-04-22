import React from 'react'
import Buildings from './Buildings'

const HomeView = ({ unlocks, buildings, resources, buyBuilding }) => (
  <Buildings
    resources={resources}
    buildings={buildings}
    unlocks={unlocks}
    buyBuilding={buyBuilding}
  />
)

export default HomeView

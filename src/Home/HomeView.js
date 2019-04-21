import React from 'react'
import Buildings from './Buildings'

const HomeView = ({ buildings, resources, buyBuilding }) => (
  <Buildings
    resources={resources}
    buildings={buildings}
    buyBuilding={buyBuilding}
  />
)

export default HomeView

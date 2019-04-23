import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const FarmView = () => (
  <>
    <Commands tab="farm" />
    <Buildings tab="farm" />
    <Jobs tab="farm" />
    <Science tab="farm" />
  </>
)

export default FarmView

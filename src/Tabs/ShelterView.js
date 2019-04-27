import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const ShelterView = () => {
  return (
    <>
      <Commands tab="shelter" />
      <Buildings tab="shelter" />
      <Jobs tab="shelter" />
      <Science tab="shelter" />
    </>
  )
}

export default ShelterView

import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const hillView = () => {
  return (
    <>
      <Commands tab="hill" />
      <Buildings tab="hill" />
      <Jobs tab="hill" />
      <Science tab="hill" />
    </>
  )
}

export default hillView

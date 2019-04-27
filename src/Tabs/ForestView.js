import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const forestView = () => {
  return (
    <>
      <Commands tab="forest" />
      <Buildings tab="forest" />
      <Jobs tab="forest" />
      <Science tab="forest" />
    </>
  )
}

export default forestView

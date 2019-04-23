import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const ForestryView = () => (
  <>
    <Commands tab="forestry" />
    <Buildings tab="forestry" />
    <Jobs tab="forestry" />
    <Science tab="forestry" />
  </>
)

export default ForestryView

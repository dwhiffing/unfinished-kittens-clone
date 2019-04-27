import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const FieldView = () => (
  <>
    <Commands tab="farm" />
    <Buildings tab="farm" />
    <Jobs tab="farm" />
    <Science tab="farm" />
  </>
)

export default FieldView

import React from 'react'
import Buildings from '../buildings/BuildingList'
import Commands from '../commands/CommandList'
import Jobs from '../jobs/JobList'
import Science from '../science/ScienceList'

const FieldView = () => (
  <>
    <Commands tab="field" />
    <Buildings tab="field" />
    <Jobs tab="field" />
    <Science tab="field" />
  </>
)

export default FieldView

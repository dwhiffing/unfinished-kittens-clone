import React from 'react'
import Buildings from '../Buildings'
import Commands from '../Commands'
import Jobs from '../Jobs'
import Science from '../Science'

const FarmView = () => (
  <>
    <Commands tab="farm" />
    <Buildings tab="farm" />
    <Jobs tab="farm" />
    <Science tab="farm" />
  </>
)

export default FarmView

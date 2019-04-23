import React from 'react'
import ScienceListView from './ScienceListView'

const ScienceView = ({ resources, science, unlocks, buyScience }) => (
  <ScienceListView
    resources={resources}
    science={science}
    unlocks={unlocks}
    buyScience={buyScience}
  />
)

export default ScienceView

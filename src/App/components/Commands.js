import React from 'react'

const Command = ({ name, onClick, canAfford = true }) => (
  <div onClick={canAfford ? onClick : null}>
    <p style={{ color: canAfford ? 'white' : 'red', cursor: 'pointer' }}>
      {name}
    </p>
  </div>
)

const Commands = ({ gatherFood, refineFood, reset }) => (
  <div className="flex flex-column">
    <Command name="Gather food" {...gatherFood} />
    <Command name="Refine food" {...refineFood} />
    <Command name="Reset" {...reset} />
  </div>
)

export default Commands

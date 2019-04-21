import React from 'react'

const Command = ({ name, onClick }) => (
  <div onClick={onClick}>
    <p>{name}</p>
  </div>
)

const Commands = ({ gatherFood, reset }) => (
  <div className="flex flex-column">
    <Command name="Gather food" onClick={gatherFood} />
    <Command name="Reset" onClick={reset} />
  </div>
)

export default Commands

import React from 'react'

const Command = ({ name, onClick }) => (
  <div onClick={onClick}>
    <p>{name}</p>
  </div>
)

const Commands = ({ gatherFood }) => (
  <div className="flex flex-column">
    <Command name="Gather food" onClick={gatherFood} />
  </div>
)

export default Commands

import React from 'react'
import { canAfford } from '../utils'

const Command = ({ name, onClick, canAfford = true }) => (
  <div onClick={canAfford ? onClick : null}>
    <p style={{ color: canAfford ? 'white' : 'red', cursor: 'pointer' }}>
      {name}
    </p>
  </div>
)

const Commands = ({ commands, triggerCommand, resources }) => (
  <div className="flex flex-column">
    {commands.map(command => (
      <Command
        key={`command-${command.name}`}
        name={command.name}
        onClick={() => triggerCommand(command)}
        canAfford={canAfford(command.prices, resources)}
      />
    ))}
  </div>
)

export default Commands

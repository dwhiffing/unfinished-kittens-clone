import React from 'react'
import { getCanAfford } from '../utils'

const Command = ({ name, onClick, color = 'white', canAfford = true }) => (
  <div onClick={canAfford ? onClick : null} className="button command">
    <p style={{ color: canAfford ? color : 'red' }}>{name}</p>
  </div>
)

const Commands = ({ commands, onClick, resources }) => (
  <div className="flex flex-column">
    {commands.map(command => (
      <Command
        key={`command-${command.name}`}
        name={command.name}
        color={command.color}
        onClick={() => onClick(command)}
        canAfford={getCanAfford(command.prices, resources)}
      />
    ))}
  </div>
)

export default Commands

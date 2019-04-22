import React from 'react'

const Command = ({ name, onClick, color = 'white', canAfford = true }) => (
  <div onClick={canAfford ? onClick : null} className="button command">
    <p style={{ color: canAfford ? color : 'red' }}>{name}</p>
  </div>
)

const CommandsList = ({ commands, triggerCommand, resources }) => (
  <div className="flex flex-column">
    {commands.map(command => (
      <Command
        key={`command-${command.name}`}
        name={command.name}
        color={command.color}
        onClick={() => triggerCommand(command)}
        canAfford={command.getCanAfford(resources)}
      />
    ))}
  </div>
)

export default CommandsList

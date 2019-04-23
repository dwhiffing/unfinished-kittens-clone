import React from 'react'

const Command = ({
  name,
  onClick,
  color = 'white',
  summary,
  canAfford = true,
}) => (
  <div onClick={canAfford ? onClick : null} className="button command">
    <p style={{ color: canAfford ? color : 'red' }}>{name}</p>
    <p>{summary[0].map(([resource, value]) => `${resource}: ${value},`)}</p>
  </div>
)

const CommandsList = ({ tab, commands, triggerCommand, resources }) => (
  <div className="flex flex-column">
    {commands
      .filter(
        command => command.tab === tab
        // && unlocks.includes(command.name)
      )
      .map(command => (
        <Command
          key={`command-${command.name}`}
          name={command.name}
          color={command.color}
          summary={command.summary()}
          onClick={() => triggerCommand(command)}
          canAfford={command.getCanAfford(resources)}
        />
      ))}
  </div>
)

export default CommandsList

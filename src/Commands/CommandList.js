import { connect } from '../storeContext'
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
    <p>{summary}</p>
  </div>
)

const CommandsList = ({ tab, commands, triggerCommand, resources }) => (
  <div className="flex flex-column">
    {commands
      .filter(command => command.tab === tab)
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

const mapStateToProps = ({ commands, resources }) => ({ commands, resources })

const mapDispatchToProps = dispatch => ({
  triggerCommand: ({ effects = [] }) => {
    effects.forEach(effect => {
      if (effect.type === 'updateResources') {
        let payload = { ...effect.payload }
        Object.entries(payload).forEach(([resource, amount]) => {
          if (Array.isArray(amount)) {
            payload[resource] =
              amount[Math.floor(Math.random() * amount.length)]
          }
        })
        dispatch({ type: 'UPDATE_RESOURCES', payload })
      }
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandsList)

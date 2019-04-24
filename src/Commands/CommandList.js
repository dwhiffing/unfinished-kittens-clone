import { connect } from '../storeContext'
import React from 'react'
import { getEffectsForCommand, getUnlockedCommands } from './selectors'

const mapStateToProps = state => ({
  commands: getUnlockedCommands(state),
})

const mapDispatchToProps = (dispatch, props, state) => ({
  triggerCommand: command => {
    getEffectsForCommand(state, command).forEach(action => dispatch(action))
  },
})

const CommandsList = ({ tab, commands, triggerCommand }) => (
  <div className="flex flex-column">
    {commands
      .filter(command => command.tab === tab)
      .map(command => (
        <Command
          key={`command-${command.name}`}
          {...command}
          onClick={() => triggerCommand(command)}
        />
      ))}
  </div>
)

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandsList)

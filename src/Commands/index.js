import { connect } from '../storeContext'
import CommandsList from './CommandsList'

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

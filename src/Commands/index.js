import { connect } from '../storeContext'
import CommandsList from './CommandsList'

const mapStateToProps = ({ commands, resources }) => ({ commands, resources })

const mapDispatchToProps = dispatch => ({
  triggerCommand: ({ effects = [] }) => {
    effects.forEach(effect => {
      if (effect.type === 'updateResources') {
        dispatch({ type: 'UPDATE_RESOURCES', payload: effect.payload })
      }
      if (effect.type === 'resetSave') {
        const shouldReset = window.confirm('sure?')
        if (shouldReset) {
          localStorage.removeItem('save')
          localStorage.removeItem('unlocks')
          document.location.reload()
        }
      }
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandsList)

import { connect } from './utils/storeContext'
import AppView from './AppView'
import { INITIAL_MODELS } from '../reducer'

const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => ({
  save: () => dispatch({ type: 'SAVE' }),
  tick: () => dispatch({ type: 'TICK' }),
  load: () => {
    const saveString = localStorage.getItem('save')
    const save = saveString ? JSON.parse(saveString) : { ...INITIAL_MODELS }

    dispatch({
      type: 'LOAD',
      payload: save,
    })
  },
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
)(AppView)

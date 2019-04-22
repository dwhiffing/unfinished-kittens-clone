import { connect } from '../storeContext'
import AppView from './AppView'
import { INITIAL_MODELS } from '../storeContext'

const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => ({
  save: () => dispatch({ type: 'SAVE' }),
  tick: () => dispatch({ type: 'TICK' }),
  load: () => {
    const saveString = localStorage.getItem('save')
    const save = saveString
      ? JSON.parse(saveString)
      : { ...INITIAL_MODELS, app: { loading: true, unlocks: [] } }

    dispatch({
      type: 'LOAD',
      payload: save,
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

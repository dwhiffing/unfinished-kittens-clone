import { connect } from '../storeContext'
import { INITIAL_MODELS } from '../reducer'
import TabView from './TabView'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  tick: index => {
    dispatch({ type: 'TICK' })
    if (index === 0) {
      dispatch({ type: 'SAVE' })
    }
  },
  load: () => {
    const saveString = localStorage.getItem('save')
    const save = saveString ? JSON.parse(saveString) : { ...INITIAL_MODELS }

    dispatch({
      type: 'LOAD',
      payload: save,
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabView)

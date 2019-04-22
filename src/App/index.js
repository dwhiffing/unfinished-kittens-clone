import { connect } from './utils/storeContext'
import AppView from './AppView'

const mapStateToProps = state => ({
  ...state,
})

const mapDispatchToProps = dispatch => ({
  save: () => dispatch({ type: 'SAVE' }),
  load: () => dispatch({ type: 'LOAD' }),
  tick: () => dispatch({ type: 'TICK' }),
  triggerCommand: ({ effects = [] }) => {
    effects.forEach(effect => dispatch(effect))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

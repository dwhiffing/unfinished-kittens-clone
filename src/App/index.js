import { connect } from './utils/storeContext'
import AppView from './AppView'

const mapStateToProps = ({ loading, resources }) => ({
  loading,
  resources,
})

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch({ type: 'RESET' }),
  save: () => dispatch({ type: 'SAVE' }),
  load: () => dispatch({ type: 'LOAD' }),
  tick: () => dispatch({ type: 'TICK' }),
  gatherFood: () => dispatch({ type: 'GATHER_FOOD' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

import { connect } from './utils/storeContext'
import AppView from './AppView'

const mapStateToProps = ({ resources }) => ({
  resources,
})

const mapDispatchToProps = dispatch => ({
  tick: () => dispatch({ type: 'TICK' }),
  gatherFood: () => dispatch({ type: 'GATHER_FOOD' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

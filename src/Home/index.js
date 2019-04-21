import { connect } from '../App/utils/storeContext'
import HomeView from './HomeView'

const mapStateToProps = ({ buildings, resources }) => ({
  buildings,
  resources,
})

const mapDispatchToProps = dispatch => ({
  buyBuilding: building =>
    dispatch({ type: 'BUY_BUILDING', payload: building }),
  gatherFood: () => dispatch({ type: 'GATHER_FOOD' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)

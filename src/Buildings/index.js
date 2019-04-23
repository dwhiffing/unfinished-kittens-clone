import { connect } from '../storeContext'
import BuildingsList from './BuildingsList'

const mapStateToProps = ({ unlocks, buildings, resources }) => ({
  buildings,
  unlocks,
  resources,
})

const mapDispatchToProps = dispatch => ({
  buyBuilding: building =>
    dispatch({ type: 'BUY_BUILDING', payload: building }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingsList)

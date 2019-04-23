import { connect } from '../storeContext'
import ShelterView from './ShelterView'

const mapStateToProps = ({
  app: { unlocks },
  buildings,
  resources,
  commands,
}) => ({
  buildings,
  unlocks,
  commands,
  resources,
})

const mapDispatchToProps = dispatch => ({
  buyBuilding: building =>
    dispatch({ type: 'BUY_BUILDING', payload: building }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShelterView)

import { connect } from '../storeContext'
import ResourcesList from './ResourcesList'

const mapStateToProps = ({ app: { unlocks }, buildings, resources, jobs }) => ({
  buildings,
  resources,
  jobs,
  unlocks,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesList)

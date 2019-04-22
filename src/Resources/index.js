import { connect } from '../storeContext'
import ResourcesList from './ResourcesList'

const mapStateToProps = ({ buildings, resources, jobs }) => ({
  buildings,
  resources,
  jobs,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourcesList)

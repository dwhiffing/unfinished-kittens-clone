import { connect } from '../storeContext'
import JobsView from './JobsView'
import { getAvailableWorkers, getTotalWorkers } from './utils'

const mapStateToProps = ({ jobs, buildings, resources, science }) => ({
  jobs,
  science,
  buildings,
  availableWorkers: getAvailableWorkers({ jobs, resources }),
  totalWorkers: getTotalWorkers(resources),
})

const mapDispatchToProps = dispatch => ({
  updateJobs: job => dispatch({ type: 'UPDATE_JOBS', payload: job }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsView)

import { connect } from '../storeContext'
import JobsList from './JobsList'
import { getAvailableWorkers, getTotalWorkers } from './utils'

const mapStateToProps = ({ jobs, resources }) => ({
  jobs,
  resources,
  availableWorkers: getAvailableWorkers({ jobs, resources }),
  totalWorkers: getTotalWorkers(resources),
})

const mapDispatchToProps = dispatch => ({
  updateJobs: job => dispatch({ type: 'UPDATE_JOBS', payload: job }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsList)

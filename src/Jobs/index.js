import { connect } from '../App/utils/storeContext'
import JobsView from './JobsView'
import { getAvailableWorkers, getTotalWorkers } from '../App/utils'

const mapStateToProps = ({ jobs, resources }) => ({
  jobs,
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

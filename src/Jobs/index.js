import { connect } from '../App/utils/storeContext'
import JobsView from './JobsView'

const mapStateToProps = ({ jobs }) => ({
  jobs,
})

const mapDispatchToProps = dispatch => ({
  updateJobs: job => dispatch({ type: 'UPDATE_JOBS', payload: job }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsView)

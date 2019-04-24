import { connect } from '../storeContext'
import React from 'react'
import {
  getUnlockedJobs,
  getAvailableWorkers,
  getTotalWorkers,
} from './selectors'

const mapStateToProps = state => ({
  jobs: getUnlockedJobs(state),
  availableWorkers: getAvailableWorkers(state),
  totalWorkers: getTotalWorkers(state),
})

const mapDispatchToProps = dispatch => ({
  updateJobs: job => dispatch({ type: 'UPDATE_JOBS', payload: job }),
})

const JobsList = ({
  jobs,
  tab,
  updateJobs,
  availableWorkers,
  totalWorkers,
}) => {
  if (totalWorkers === 0 || jobs.length === 0) {
    return false
  }

  return (
    <>
      <p>
        Available workers: {availableWorkers}/{totalWorkers}
      </p>
      {jobs
        .filter(job => !tab || job.tab === tab)
        .map(job => (
          <Job
            key={job.name}
            {...job}
            updateJobs={value => updateJobs({ name: job.name, value })}
          />
        ))}
    </>
  )
}

const Job = ({ name, value, updateJobs, canAfford, summary }) => (
  <div className="flex justify-between align-center job">
    <p style={{ color: canAfford ? 'white' : 'red' }}>
      {name} ({value})
    </p>
    <p>{summary}</p>
    <div className="flex">
      <div
        className="button small"
        onClick={() => canAfford && updateJobs(1)}
        style={{ marginRight: 10 }}>
        <span>+</span>
      </div>
      <div className="button small" onClick={() => updateJobs(-1)}>
        <span>-</span>
      </div>
    </div>
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobsList)

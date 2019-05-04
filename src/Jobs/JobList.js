import { getFoodDrain } from './../resources/selectors'
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
  foodDrain: getFoodDrain(state),
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
  foodDrain,
}) => {
  if (
    totalWorkers === 0 ||
    jobs.filter(job => !tab || job.tab === tab).length === 0
  ) {
    return false
  }

  return (
    <>
      <p>
        Available workers: {availableWorkers}/{totalWorkers}
      </p>
      <p>Food drain: {foodDrain.toFixed(2)}</p>
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

const Job = ({ name, max, value, updateJobs, canAfford, summary }) => (
  <div
    className="flex justify-between align-center job"
    style={{ opacity: value === max ? 0.5 : 1 }}>
    <p style={{ color: canAfford ? 'white' : 'red' }}>
      {name} ({value}
      {max < 1000 ? `/${max}` : ''})
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

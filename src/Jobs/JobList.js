import { connect } from '../storeContext'
import { getAvailableWorkers, getTotalWorkers } from './utils'
import React from 'react'

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

const JobsList = ({
  jobs,
  tab,
  unlocks,
  updateJobs,
  availableWorkers,
  totalWorkers,
}) => {
  const availableJobs = jobs.filter(
    job =>
      !tab ||
      (job.tab === tab && unlocks.find(unlock => unlock.name === job.name))
  )

  if (totalWorkers === 0 || availableJobs.length === 0) {
    return false
  }

  return (
    <>
      <p>
        Available workers: {availableWorkers}/{totalWorkers}
      </p>
      {availableJobs.map(job => (
        <Job
          key={job.name}
          {...job}
          summary={job.summary()}
          canAfford={availableWorkers > 0}
          updateJobs={value =>
            updateJobs({
              name: job.name,
              value,
            })
          }
        />
      ))}
    </>
  )
}

const mapStateToProps = ({ unlocks, jobs, resources }) => ({
  jobs,
  resources,
  unlocks,
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

import React from 'react'

const Job = ({ name, value, updateJobs, canAfford }) => (
  <div className="flex justify-between align-center job">
    <p style={{ color: canAfford ? 'white' : 'red' }}>
      {name} ({value})
    </p>
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

const JobsList = ({ jobs, updateJobs, availableWorkers, totalWorkers }) => (
  <>
    <p>
      Available workers: {availableWorkers}/{totalWorkers}
    </p>
    {jobs.map(job => (
      <Job
        key={job.name}
        {...job}
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

export default JobsList

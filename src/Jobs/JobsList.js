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
  resources,
  tab,
  updateJobs,
  availableWorkers,
  totalWorkers,
}) => (
  <>
    <p>
      Available workers: {availableWorkers}/{totalWorkers}
    </p>
    {jobs
      .filter(job => !tab || (job.tab === tab && job.isUnlocked({ resources })))
      .map(job => (
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

export default JobsList

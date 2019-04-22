import React from 'react'
import JobsList from './JobsList'

const JobsView = ({ jobs, updateJobs, availableWorkers, totalWorkers }) => (
  <JobsList
    jobs={jobs}
    updateJobs={updateJobs}
    availableWorkers={availableWorkers}
    totalWorkers={totalWorkers}
  />
)

export default JobsView

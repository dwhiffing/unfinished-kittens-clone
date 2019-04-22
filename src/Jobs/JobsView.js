import React from 'react'
import JobsList from './JobsList'

const JobsView = ({ jobs, updateJobs }) => (
  <JobsList jobs={jobs} updateJobs={updateJobs} />
)

export default JobsView

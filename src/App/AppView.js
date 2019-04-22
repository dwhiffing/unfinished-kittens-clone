import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Buildings from '../Buildings'
import Jobs from '../Jobs'
import Links from './components/Links'
import Commands from '../Commands/CommandsList'
import Resources from '../Resources/ResourcesList'

import { TICK_DURATION } from '../constants'
const AppView = ({
  save,
  load,
  tick,
  triggerCommand,
  loading,
  resources,
  buildings,
  jobs,
  commands,
  unlocks,
}) => {
  if (loading) {
    load()
    return false
  }

  useEffect(() => {
    setInterval(tick, TICK_DURATION)
  }, [])

  useEffect(() => {
    setInterval(save, TICK_DURATION)
  }, [])

  return (
    <Router>
      <div className="flex flex-row height-100">
        <div className="flex flex-column" style={{ flex: 1, padding: 10 }}>
          <Links showJobs={unlocks.includes('folks')} />
          <Commands
            commands={commands}
            resources={resources}
            onClick={triggerCommand}
          />
          <Resources resources={resources} buildings={buildings} jobs={jobs} />
        </div>
        <div style={{ flex: 2, padding: 10 }}>
          <div>
            <Route exact path="/" component={Buildings} />
            <Route exact path="/jobs" component={Jobs} />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default AppView

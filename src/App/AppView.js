import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Buildings from '../Buildings'
import Jobs from '../Jobs'
import Commands from '../Commands/CommandsList'
import Resources from '../Resources/ResourcesList'
import { Link } from 'react-router-dom'

import { TICK_DURATION } from '../constants'
const AppView = ({ save, load, tick, triggerCommand, state }) => {
  if (state.app.loading) {
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
          <div className="flex flex-column">
            <Link to="/">Bonfire</Link>
            {state.unlocks.includes('folks') && <Link to="/jobs">Village</Link>}
          </div>
          <Commands
            commands={state.commands}
            resources={state.resources}
            onClick={triggerCommand}
          />
          <Resources
            resources={state.resources}
            buildings={state.buildings}
            jobs={state.jobs}
          />
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

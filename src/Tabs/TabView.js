import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Buildings from '../Buildings'
import Shelter from './ShelterView'
import Farm from './FarmView'
import Forestry from './ForestryView'
import Jobs from '../Jobs'
import Resources from '../Resources'
import Links from './Links'
import { TICK_DURATION } from '../constants'

const TabView = ({ load, tick }) => {
  useEffect(() => {
    load()
    let i = 0
    setInterval(() => {
      if (i > 20) {
        i = 0
      }
      tick(i++)
    }, TICK_DURATION)
  }, [])

  return (
    <Router>
      <div className="flex flex-row height-100">
        <div className="flex flex-column" style={{ flex: 1, padding: 10 }}>
          <Links />
          <Resources />
        </div>
        <div style={{ flex: 2, padding: 10 }}>
          <div>
            <Route exact path="/" component={Shelter} />
            <Route exact path="/farm" component={Farm} />
            <Route exact path="/forestry" component={Forestry} />
            <Route exact path="/buildings" component={Buildings} />
            <Route exact path="/jobs" component={Jobs} />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default TabView

import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from '../Home'
import Links from './components/Links'
import Commands from './components/Commands'
import Resources from './components/Resources'
import { TICK_DURATION } from './utils/constants'

const AppView = ({ tick, gatherFood, resources }) => {
  useEffect(() => {
    setInterval(tick, TICK_DURATION)
  }, [])

  return (
    <Router>
      <div className="flex flex-row height-100">
        <div className="flex flex-column" style={{ flex: 1 }}>
          <Links />
          <Commands gatherFood={gatherFood} />
          <Resources resources={resources} />
        </div>
        <div style={{ flex: 2 }}>
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </div>
    </Router>
  )
}

export default AppView

import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { StoreContext } from './storeContext'
import Home from './Home'

const App = () => {
  const { dispatch } = useContext(StoreContext)

  useEffect(() => {
    setInterval(() => dispatch({ type: 'TICK' }), 200)
  }, [])

  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  )
}

export default App

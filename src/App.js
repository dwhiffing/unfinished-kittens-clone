import React, { useEffect, useContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import { StoreContext } from './storeContext'

const Slat = ({ label, onClick }) => (
  <div onClick={onClick}>
    <p>{label}</p>
  </div>
)
const Links = () => (
  <div className="flex flex-column">
    <Link to="/">Bonfire</Link>
    <Link to="/townhall">Village</Link>
    <Link to="/research">Research</Link>
    <Link to="/crafting">Crafting</Link>
    <Link to="/settings">Settings</Link>
  </div>
)
const Command = ({ name, onClick }) => (
  <div onClick={onClick}>
    <p>{name}</p>
  </div>
)
const Commands = () => {
  const { dispatch } = useContext(StoreContext)

  return (
    <div className="flex flex-column">
      <Command
        name="Gather food"
        onClick={() => {
          dispatch({
            type: 'INCREMENT_RESOURCE',
            payload: { name: 'food', value: 1 },
          })
        }}
      />
    </div>
  )
}
const Resource = ({ name, value }) => (
  <div>
    <p>
      <span>{name}</span>: <span>{value}</span>
    </p>
  </div>
)
const Resources = () => {
  const { state } = useContext(StoreContext)
  return (
    <div className="flex flex-column">
      <Resource name="food" value={state.resources.food} />
    </div>
  )
}

const Home = () => {
  const { dispatch, state } = useContext(StoreContext)
  return (
    <div className="flex flex-row height-100">
      <div className="flex flex-column" style={{ flex: 1 }}>
        <Links />
        <Commands />
        <Resources />
      </div>
      <div style={{ flex: 2 }}>
        <Slat
          label={`field - ${state.buildings.field}`}
          onClick={() =>
            dispatch({
              type: 'BUY_BUILDING',
              payload: { name: 'field', value: 1 },
            })
          }
        />
      </div>
    </div>
  )
}

const App = () => {
  const { state, dispatch } = useContext(StoreContext)

  const tick = () => {
    dispatch({
      type: 'INCREMENT_RESOURCE',
      payload: { name: 'food', value: state.buildings.field },
    })
  }

  useEffect(() => {
    setTimeout(tick, 1000)
  })

  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  )
}

export default App

import React, { createContext, useReducer } from 'react'
import data from './constants'
import resourcesReducer from './Resources/reducer'
import buildingsReducer from './Buildings/reducer'
import commandsReducer from './Commands/reducer'
import jobsReducer from './Jobs/reducer'
import appReducer from './App/reducer'

export const INITIAL_MODELS = {
  resources: [],
  buildings: [],
  commands: [],
  jobs: [],
}

export const initialState = {
  app: { loading: true, unlocks: [] },
  ...INITIAL_MODELS,
  ...data,
}
const combineReducers = (reducers, initialState = {}) => {
  return (state = initialState, action) => {
    const nextReducers = {}
    Object.entries(reducers).forEach(([key, reducer]) => {
      nextReducers[key] = reducer(state, action)
    })
    return nextReducers
  }
}

const reducer = combineReducers(
  {
    resources: resourcesReducer,
    commands: commandsReducer,
    buildings: buildingsReducer,
    jobs: jobsReducer,
    app: appReducer,
    tabs: state => state.tabs,
  },
  initialState
)

const StoreContext = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

const connect = (mapStateToProps, mapDispatchToProps) => Component => props => (
  <StoreContext.Consumer>
    {({ state, dispatch }) => (
      <Component
        {...props}
        {...mapStateToProps(state, props)}
        {...mapDispatchToProps(dispatch, props, state)}
      />
    )}
  </StoreContext.Consumer>
)

export { StoreContext, StoreProvider, connect }

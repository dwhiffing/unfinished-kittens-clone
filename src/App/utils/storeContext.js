import React, { createContext, useReducer } from 'react'
import data, { nameToIndex } from './constants'
import u from 'updeep'

const initialState = {
  loading: false,
  ...data,
}

const reducer = (state, action) => {
  if (action.type === 'TICK') {
    const foodPerTick =
      state.buildings[0].effects.foodPerTick * state.buildings[0].value

    return u(updateResources({ food: foodPerTick }), state)
  }

  if (action.type === 'GATHER_FOOD') {
    return u(updateResources({ food: 1 }), state)
  }

  if (action.type === 'BUY_BUILDING') {
    const { name, value, cost } = action.payload
    console.log(action.payload)
    return u(
      {
        ...updateBuildings({ [name]: value }),
        ...updateResources(cost),
      },
      state
    )
  }
  return state
}

const updateSlice = (key, updates) => {
  const updateToPush = { [key]: {} }

  Object.keys(updates).forEach(resourceName => {
    const amount = updates[resourceName]
    const index = nameToIndex[key][resourceName]
    updateToPush[key][index] = { value: i => i + amount }
  })

  return updateToPush
}

const updateResources = updates => updateSlice('resources', updates)
const updateBuildings = updates => updateSlice('buildings', updates)

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

import React, { createContext, useReducer } from 'react'

const initialState = {
  loading: true,
  buildings: {
    field: 0,
  },
  resources: {
    food: 0,
  },
}

const reducer = (state, action) => {
  if (action.type === 'INCREMENT_RESOURCE') {
    const { name, value } = action.payload
    console.log(name, value)
    return {
      ...state,
      resources: {
        ...state.resources,
        [name]: state.resources[name] + value,
      },
    }
  }
  if (action.type === 'BUY_BUILDING') {
    const { name, value } = action.payload
    return {
      ...state,
      buildings: {
        ...state.buildings,
        [name]: state.buildings[name] + value,
      },
    }
  }
  return state
}

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
        {...mapDispatchToProps(dispatch, props)}
      />
    )}
  </StoreContext.Consumer>
)

export { StoreContext, StoreProvider, connect }

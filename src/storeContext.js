import React, { createContext, useReducer, useEffect } from 'react'
import reducer, { initialState, INITIAL_MODELS } from './reducer'

const StoreContext = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const saveString = localStorage.getItem('save')
    const save = saveString ? JSON.parse(saveString) : { ...INITIAL_MODELS }

    dispatch({ type: 'LOAD', payload: save })
    setInterval(() => dispatch({ type: 'TICK' }), 200)
    setInterval(() => dispatch({ type: 'SAVE' }), 200)
  }, [])

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

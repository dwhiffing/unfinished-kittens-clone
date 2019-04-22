import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { StoreProvider } from './storeContext'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

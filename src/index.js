import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Tabs from './Tabs'
import { StoreProvider } from './storeContext'

ReactDOM.render(
  <StoreProvider>
    <Tabs />
  </StoreProvider>,
  document.getElementById('root')
)

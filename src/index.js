import React from 'react'
import ReactDOM from 'react-dom/client'
import Pagination from './Pagination'
import { AppProvider } from './Component/Context'
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Pagination />
      </Router>
    </AppProvider>
  </React.StrictMode>
)

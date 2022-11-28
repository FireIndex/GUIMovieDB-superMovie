import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Home'

import './css/style.css'

const Pagination = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default Pagination

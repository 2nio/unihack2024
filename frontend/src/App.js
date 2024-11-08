import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'

const App = () =>
(
  <>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </>
)

export default App
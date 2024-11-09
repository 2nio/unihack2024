import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Course from './pages/course'

const App = () =>
(
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course/*' element={<Course />} />
    </Routes>
  </>
)

export default App
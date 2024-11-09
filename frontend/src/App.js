import React from 'react'
import { BrowserRouter as Routers, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Course from './pages/course'
import Dashboard from './pages/dashboard'
import Courses from './pages/courses'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'


const App = () =>
(
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course/*' element={<Course />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard'element={<Dashboard/>}/>
      <Route path='/courses'element={<Courses/>}/>
    </Routes>
  </>
)

export default App
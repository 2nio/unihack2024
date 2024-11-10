import React from 'react'
import { BrowserRouter as Routers, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Course from './pages/course'
import Dashboard from './pages/dashboard'
import Courses from './pages/courses'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Comprehension from './pages/comprehension'


const App = () =>
(
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/course/*' element={<Course />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/course/grades'element={<Dashboard/>}/>
      <Route path='/create'element={<Courses/>}/>
      <Route path='/comprehension'element={<Comprehension/>}/>
    </Routes>
  </>
)

export default App
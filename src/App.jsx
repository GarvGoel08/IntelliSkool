import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Meet from './components/studentMeet'
import Home from './pages/Home'
import Login from './components/Login'
import CreateClass from './components/CreateClass'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentDashboard from './components/studentDashboard'
import StudentClassrooms from './components/studentClassrooms'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/meet" element={<Meet />} />
        <Route path="/" element={<Home />} />
        <Route path="/create-class" element={<CreateClass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/:id" element={<StudentDashboard />} />
        <Route path="/student/classes" element={<StudentClassrooms />} />
      </Routes>
    </Router>
  )
}

export default App

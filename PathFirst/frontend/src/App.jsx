import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ExamCalendar from './pages/ExamCalendar'
import ScholarshipFinder from './pages/ScholarshipFinder'
import Checklist from './pages/Checklist'
import CollegeCompare from './pages/CollegeCompare'
import MentorChat from './pages/MentorChat'

export const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exams" element={<ExamCalendar />} />
          <Route path="/scholarships" element={<ScholarshipFinder />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/colleges" element={<CollegeCompare />} />
          <Route path="/mentors" element={<MentorChat />} />
        </Routes>
      </BrowserRouter>
    </AuthCtx.Provider>
  )
}
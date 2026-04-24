import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AsideBar from '../components/AsideBar'
import Footer from '../components/Footer'
import axiosInstance from '../api/axiosInstance'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  )

  function toggleTheme() {
    setDarkMode(prev => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  async function fetchUser() {
    try {
      const res = await axiosInstance.get('/user/getUserInfo')
      if (res.data.success) setUser(res.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchUser() }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  if (!user) return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <div
          className="spinner-border mb-3"
          role="status"
          style={{ color: 'var(--primary)', width: 48, height: 48, borderWidth: 4 }}
        />
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading your workspace...</p>
      </div>
    </div>
  )

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <Navbar user={user} darkMode={darkMode} toggleTheme={toggleTheme} />

      <div className="main-layout">
        <div className="sidebar">
          <AsideBar user={user} darkMode={darkMode} />
        </div>

        <div className="content-area">
          <div className="app-card p-4 h-100" style={{ minHeight: '100%' }}>
            <Outlet context={{ user }} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
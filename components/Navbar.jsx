import React from 'react'
import { FaMoon, FaSun, FaBolt, FaBell } from 'react-icons/fa'

const Navbar = ({ user, darkMode, toggleTheme }) => {
  return (
    <nav className="app-navbar d-flex align-items-center px-4 py-2" style={{ height: 60 }}>
      
      <div className="d-flex align-items-center gap-2 me-auto">
        <div
          style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.9rem'
          }}
        >
          <FaBolt />
        </div>
        <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-heading)' }}>
          TaskFlow
        </span>
      </div>

      {/* Right side */}
      <div className="d-flex align-items-center gap-3">
        {/* Notification bell */}
        <button
          className="btn btn-sm p-2"
          style={{
            borderRadius: 10,
            background: 'rgba(99,102,241,0.08)',
            border: 'none',
            color: 'var(--primary)'
          }}
          title="Notifications"
        >
          <FaBell style={{ fontSize: '0.9rem' }} />
        </button>

        {/* User greeting */}
        {user && (
          <div className="d-none d-md-flex align-items-center gap-2">
            <div
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>
              {user.name}
            </span>
          </div>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
          style={{
            width: 38, height: 38, borderRadius: 10,
            background: darkMode ? 'rgba(250,204,21,0.12)' : 'rgba(99,102,241,0.08)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: darkMode ? '#fbbf24' : '#6366f1',
            fontSize: '0.95rem',
            transition: 'background 0.2s'
          }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
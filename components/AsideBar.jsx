import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  FaUser, FaTasks, FaPlus, FaUsers,
  FaSignOutAlt, FaChartPie, FaLayerGroup
} from 'react-icons/fa'

const AsideBar = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem('b69')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const NavItem = ({ to, icon, label }) => (
    <li className="nav-item">
      <Link
        className={`nav-link ${isActive(to) ? 'active' : ''}`}
        to={to}
        style={isActive(to) ? { background: 'rgba(99,102,241,0.25)', color: '#fff' } : {}}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  )

  return (
    <div className="d-flex flex-column h-100 py-3 px-3">
      {/* Profile Section */}
      <div className="text-center mb-4 pt-2">
        <div className="profile-avatar-ring mx-auto mb-2" style={{ width: 72, height: 72 }}>
          <img
            src={user.img_path || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
            alt="profile"
          />
        </div>
        <h6 style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 2, fontSize: '0.95rem' }}>
          {user?.name?.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </h6>
        <span
          style={{
            fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.07em', padding: '2px 10px', borderRadius: 20,
            background: 'rgba(99,102,241,0.35)', color: '#a5b4fc'
          }}
        >
          {user.role}
        </span>
      </div>

      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 12px' }} />

      <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
        Navigation
      </p>

      <ul className="nav flex-column gap-1 flex-grow-1">
        <NavItem to="/protected/profile" icon={<FaUser />} label="Profile" />

        {user?.role === 'user' && (
          <NavItem to="/protected/my-tasks" icon={<FaTasks />} label="My Tasks" />
        )}

        {user?.role === 'admin' && (
          <>
            <NavItem to="/protected/stats" icon={<FaChartPie />} label="Dashboard" />
            <NavItem to="/protected/tasks" icon={<FaTasks />} label="All Tasks" />
            <NavItem to="/protected/create-task" icon={<FaPlus />} label="Create Task" />
            <NavItem to="/protected/users" icon={<FaUsers />} label="All Users" />
            <NavItem to="/protected/user-tasks" icon={<FaLayerGroup />} label="User Tasks" />
          </>
        )}
      </ul>

      {/* Logout */}
      <div className="mt-auto pt-3">
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '0 0 12px' }} />
        <button
          className="btn w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={handleLogout}
          style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#fca5a5',
            borderRadius: 10,
            padding: '8px 12px',
            fontWeight: 600,
            fontSize: '0.875rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.28)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  )
}

export default AsideBar
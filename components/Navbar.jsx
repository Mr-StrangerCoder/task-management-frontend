import React from 'react'
import { Navbar as BsNavbar, Container } from 'react-bootstrap'
import { FaMoon, FaSun } from 'react-icons/fa'

const Navbar = ({ user, darkMode, toggleTheme }) => {
  return (
    <BsNavbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      className="border-bottom shadow-sm"
      style={{ width: '100%' }}
    >
      <Container fluid className="px-3">
        <BsNavbar.Brand className="fw-bold fs-5">
      
        </BsNavbar.Brand>

        <div className="d-flex align-items-center gap-3 ms-auto">
          {user && (
            <span className="text-muted small d-none d-md-inline">
              👋 {user.name}
            </span>
          )}
          <button
            className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </Container>
    </BsNavbar>
  )
}

export default Navbar

import React, { useState, useEffect } from 'react'
import { Navbar as BsNavbar, Container, Image } from 'react-bootstrap'
import { FaMoon, FaSun } from 'react-icons/fa'

const Navbar = () => {


  const [darkMode, setDarkMode] = useState(false)

  
  function toggleTheme() {
    setDarkMode(!darkMode)
  }

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
  }, [darkMode])

  return (
    <BsNavbar className='border' bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"}>
      <Container fluid>
        <BsNavbar.Brand>Task Manager</BsNavbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-secondary"
            onClick={toggleTheme}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
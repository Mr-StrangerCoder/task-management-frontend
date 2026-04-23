import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AsideBar from '../components/AsideBar'
import Footer from '../components/Footer'
import axiosInstance from '../api/axiosInstance'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [darkMode, setDarkMode] = useState(false)

    function toggleTheme() {
        setDarkMode(prev => !prev)
    }

    async function fetchUser() {
        try {
            const res = await axiosInstance.get('/user/getUserInfo')
            if (res.data.success) {
                setUser(res.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    
    useEffect(() => {
        document.body.style.background = darkMode ? '#1a1a2e' : '#f8f9fa'
    }, [darkMode])

    if (!user) return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status" />
        </div>
    )

    return (

        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
            className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>

        
            <Navbar user={user} darkMode={darkMode} toggleTheme={toggleTheme} />

        
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        
                <div style={{ width: '220px', flexShrink: 0, minHeight: '100%' }}
                    className="bg-dark text-white">
                    <AsideBar user={user} darkMode={darkMode} />
                </div>

    
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}
                    className={darkMode ? 'bg-dark' : 'bg-light'}>
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <Outlet context={{ user }} />
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Dashboard

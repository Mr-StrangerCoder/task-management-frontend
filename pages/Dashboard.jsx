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
        setDarkMode(!darkMode)
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

    if (!user) return <h3 className="text-center mt-5">Loading Dashboard...</h3>

    return (
      <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} >
        <div className="d-flex flex-column vh-100 ">

            <Navbar user={user} />

            <div className="container-fluid flex-grow-1">
                <div className="row h-100">

                    {/* Sidebar */}
                    <div className="col-md-3 col-lg-2 bg-dark text-white p-0">
                        <AsideBar user={user} darkMode={darkMode}/>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9 col-lg-10 p-4 bg-light">

                        <div className="card shadow-sm border-0">
                            <div className="card-body">

                                <Outlet context={{ user }} />

                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />

        </div>
      </div>
    )
}

export default Dashboard
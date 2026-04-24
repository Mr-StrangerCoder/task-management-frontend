import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaTasks, FaPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa'

const AsideBar = ({ user }) => {

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('b69')
        navigate('/')
    }

    return (
        <div className="p-3 ">
            <div className="text-center mb-4">
                <img
                    src={user.img_path || 'https://via.placeholder.com/80'}
                    alt="profile"
                    width="80"
                    height="80" 
                    style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid white"
                    }}
                />

                <h6 className="mt-2">{user?.name
                    ?.split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}</h6>
                <small className="text-light">{user.role}</small>

            </div>

            <hr className="text-secondary" />

            <h6 className="text-light mb-3 text-center">Menu</h6>

            <ul className="nav flex-column gap-2">

                <li className="nav-item">
                    <Link className="nav-link text-white d-flex align-items-center gap-2" to="/protected/profile">
                        <FaUser /> Profile
                    </Link>
                </li>

                {/* USER MENU */}
                {user?.role === 'user' && (
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center gap-2" to="/protected/my-tasks">
                            <FaTasks /> My Tasks
                        </Link>
                    </li>
                )}

                {/* ADMIN MENU */}
                {user?.role === 'admin' && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link text-white d-flex align-items-center gap-2" to="/protected/tasks">
                                <FaTasks /> All Tasks
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white d-flex align-items-center gap-2" to="/protected/create-task">
                                <FaPlus /> Create Task
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link text-white d-flex align-items-center gap-2" to="/protected/users">
                                <FaUsers /> All Users
                            </Link>
                        </li>
                    </>
                )}

                <li className="mt-3">
                    <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
                        onClick={handleLogout}>
                        <FaSignOutAlt />
                        Logout
                    </button>
                </li>

            </ul>

        </div>
    )
}

export default AsideBar
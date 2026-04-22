import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)

            const res = await axiosInstance.post('/user/login', form)

            if (res.data.success) {
                const t = res?.data?.token
                localStorage.setItem('b69', t)
                alert(res.data.msg)
                navigate('/protected')
            } else {
                alert(res.data.msg)
            }

        } catch (err) {
            console.error(err)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "linear-gradient(135deg, #797b86, #706879)"
            }}
        >

            <div
                className="p-4 shadow-lg"
                style={{
                    width: '400px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(15px)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white'
                }}
            >

                <h3 className="text-center mb-4">Welcome Back</h3>

                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaLock /></span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="input-group-text"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                
                    <button
                        className="btn btn-light w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                
                    <div className="text-center">
                        <small>
                            Don't have an account?{" "}
                            <span
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </span>
                        </small>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
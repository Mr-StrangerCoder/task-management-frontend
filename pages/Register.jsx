import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import {
    FaUser, FaEnvelope, FaLock, FaPhone,
    FaUpload, FaEye, FaEyeSlash
} from 'react-icons/fa'

const Register = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: ''
    })

    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleFile(e) {
        const selected = e.target.files[0]
        setFile(selected)
        if (selected) {
            setPreview(URL.createObjectURL(selected))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.email || !form.password) {
            alert("Email & Password required")
            return
        }

        const formData = new FormData()
        Object.keys(form).forEach(key => {
            formData.append(key, form[key])
        })
       if (file) formData.append('myFile', file)

        try {
            setLoading(true)

            const res = await axiosInstance.post('/user/register', formData)

            if (res.data.success) {
                alert(res.data.msg)
                navigate('/')
            } else {
                alert("Registration failed")
            }

        } catch (err) {
            console.error(err, "77777777777777777777777777")
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
                    width: '420px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(15px)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white'
                }}
            >

                <h3 className="text-center mb-4">Create Account</h3>

                <form onSubmit={handleSubmit}>

            
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaUser /></span>
                        <input
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
                            onChange={handleChange}
                        />
                    </div>

                
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </div>

            
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaLock /></span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <span
                            className="input-group-text"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FaPhone /></span>
                        <input
                            name="contactNumber"
                            className="form-control"
                            placeholder="Contact Number"
                            onChange={handleChange}
                        />
                    </div>


                    <div className="text-center mb-3">
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                            />
                        )}
                    </div>

                
                    <div className="mb-3">
                        <label className="form-label">
                            <FaUpload /> Upload Profile Image
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFile}
                        />
                    </div>

                    <button
                        className="btn btn-light w-100"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>


                    <div className="text-center mt-3">
                        <small>
                            Already have an account?{" "}
                            <span
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => navigate('/')}
                            >
                                Login
                            </span>
                        </small>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register
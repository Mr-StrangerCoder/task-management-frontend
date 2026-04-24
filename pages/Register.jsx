import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import {
  FaUser, FaEnvelope, FaLock, FaPhone,
  FaUpload, FaEye, FaEyeSlash, FaBolt
} from 'react-icons/fa'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', contactNumber: '' })
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
    if (selected) setPreview(URL.createObjectURL(selected))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) { alert('Email & Password required'); return }
    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))
    if (file) formData.append('myFile', file)
    try {
      setLoading(true)
      const res = await axiosInstance.post('/user/register', formData)
      if (res.data.success) { alert(res.data.msg); navigate('/') }
      else alert('Registration failed')
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: 460 }}>
        <div className="text-center mb-4">
          <div
            style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px', fontSize: '1.5rem'
            }}
          >
            <FaBolt />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join TaskFlow and get organized</p>
        </div>

        {/* Avatar Preview */}
        {preview && (
          <div className="text-center mb-3">
            <img
              src={preview}
              alt="preview"
              style={{
                width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.5)'
              }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text"><FaUser /></span>
            <input name="name" className="form-control" placeholder="Full Name" onChange={handleChange} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text"><FaEnvelope /></span>
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
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
            <input name="contactNumber" className="form-control" placeholder="Contact Number" onChange={handleChange} />
          </div>

          <div className="mb-4">
            <label
              className="d-flex align-items-center gap-2 mb-1"
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 500 }}
            >
              <FaUpload /> Profile Image (optional)
            </label>
            <input type="file" className="form-control" onChange={handleFile} accept="image/*" />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              background: 'rgba(255,255,255,0.25)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 12,
              padding: '10px',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" />Registering...</>
            ) : 'Create Account'}
          </button>

          <div className="text-center">
            <small style={{ color: 'rgba(255,255,255,0.75)' }}>
              Already have an account?{' '}
              <span className="auth-link" onClick={() => navigate('/')}>Sign in</span>
            </small>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
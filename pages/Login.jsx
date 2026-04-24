import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaBolt } from 'react-icons/fa'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
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
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px',
              fontSize: '1.5rem'
            }}
          >
            <FaBolt />
          </div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to your TaskFlow account</p>
        </div>

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
          <div className="input-group mb-4">
            <span className="input-group-text"><FaLock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
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
            type="submit"
            className="btn w-100 mb-3 fw-600"
            style={{
              background: 'rgba(255,255,255,0.25)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 12,
              padding: '10px',
              fontWeight: 600,
              fontSize: '0.95rem',
              backdropFilter: 'blur(10px)',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
            ) : 'Sign In'}
          </button>

          <div className="text-center">
            <small style={{ color: 'rgba(255,255,255,0.75)' }}>
              Don't have an account?{' '}
              <span className="auth-link" onClick={() => navigate('/register')}>
                Register now
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
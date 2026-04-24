import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FaPlus, FaAlignLeft, FaFlag, FaCalendarAlt } from 'react-icons/fa'

const CreateTask = () => {
  const [form, setForm] = useState({
    title: '', description: '', startDate: '', endDate: '', status: 'pending', priority: 'low'
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axiosInstance.post('/task/create', form)
      console.log(res.data)
      if (res.data.success) {
        toast.success(res.data.msg)
        setForm({ title: '', description: '', startDate: '', endDate: '', status: 'pending', priority: 'low' })
      } else {
        toast.error(res.data.msg || 'Failed to create task')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.msg || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = { fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }
  const controlStyle = { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 10, padding: '9px 14px' }

  return (
    <div>
      <div className="page-header mb-4">
        <div className="page-header-icon"><FaPlus /></div>
        <h4>Create New Task</h4>
      </div>

      <div className="app-card p-4" style={{ maxWidth: 720 }}>
        <form onSubmit={handleSubmit}>
          <Row className="g-3 mb-3">
            <Col md={8}>
              <label style={labelStyle}>Task Title</label>
              <input
                type="text" name="title" value={form.title}
                className="form-control" style={controlStyle}
                placeholder="Enter a clear, descriptive title"
                onChange={handleChange} required
              />
            </Col>
            <Col md={4}>
              <label style={labelStyle}><FaFlag style={{ marginRight: 4 }} /> Priority</label>
              <select name="priority" value={form.priority} className="form-select" style={controlStyle} onChange={handleChange}>
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </Col>
          </Row>

          <div className="mb-3">
            <label style={labelStyle}><FaAlignLeft style={{ marginRight: 4 }} /> Description</label>
            <textarea
              name="description" value={form.description}
              className="form-control" style={{ ...controlStyle, resize: 'vertical' }}
              rows={4} placeholder="Describe what needs to be done..."
              onChange={handleChange}
            />
          </div>

          <Row className="g-3 mb-3">
            <Col md={6}>
              <label style={labelStyle}><FaCalendarAlt style={{ marginRight: 4 }} /> Start Date</label>
              <input type="date" name="startDate" value={form.startDate} className="form-control" style={controlStyle} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <label style={labelStyle}><FaCalendarAlt style={{ marginRight: 4 }} /> End Date</label>
              <input type="date" name="endDate" value={form.endDate} className="form-control" style={controlStyle} onChange={handleChange} />
            </Col>
          </Row>

          <div className="mb-4" style={{ maxWidth: 240 }}>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} className="form-select" style={controlStyle} onChange={handleChange}>
              <option value="pending">⏳ Pending</option>
              <option value="inprogress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary-app d-flex align-items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm" /> Creating...</>
            ) : (
              <><FaPlus /> Create Task</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'

const UpdateTaskModal = ({ show, handleClose, task, refresh }) => {
  const [form, setForm] = useState({})

  useEffect(() => { if (task) setForm(task) }, [task])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleUpdate() {
    const res = await axiosInstance.put(`/task/updateTaskByAdmin/${task.id}`, form)
    if (res.data.success) { toast.success(res.data.msg); handleClose(); refresh() }
  }

  const labelStyle = { fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--border)' }}>
        <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>
          <FaEdit style={{ marginRight: 8, color: 'var(--primary)' }} /> Edit Task
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column gap-3">
        <div>
          <label style={labelStyle}>Title</label>
          <Form.Control name="title" value={form.title || ''} onChange={handleChange} style={{ borderRadius: 10 }} />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <Form.Control as="textarea" rows={3} name="description" value={form.description || ''} onChange={handleChange} style={{ borderRadius: 10 }} />
        </div>
        <div className="d-flex gap-3">
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Status</label>
            <Form.Select name="status" value={form.status || ''} onChange={handleChange} style={{ borderRadius: 10 }}>
              <option value="pending">⏳ Pending</option>
              <option value="inprogress">🔄 In Progress</option>
              <option value="completed">✅ Completed</option>
            </Form.Select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Priority</label>
            <Form.Select name="priority" value={form.priority || ''} onChange={handleChange} style={{ borderRadius: 10 }}>
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </Form.Select>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid var(--border)' }}>
        <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: 10 }}>Cancel</Button>
        <button className="btn-primary-app" onClick={handleUpdate}>
          <FaEdit style={{ marginRight: 6 }} /> Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateTaskModal
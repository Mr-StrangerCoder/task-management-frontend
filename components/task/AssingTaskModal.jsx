import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { FaUserPlus } from 'react-icons/fa'

const AssignModal = ({ show, handleClose, task, users }) => {
  const [userId, setUserId] = useState('')

  async function handleAssign() {
    if (!userId) return toast.error('Select user')
    const res = await axiosInstance.post('/assignTask/assign', {
      user_id: userId, task_id: task.id
    })
    if (res.data.success) { toast.success(res.data.msg); handleClose() }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--border)' }}>
        <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>
          <FaUserPlus style={{ marginRight: 8, color: 'var(--primary)' }} />
          Assign Task
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="app-card p-3 mb-3" style={{ background: 'rgba(99,102,241,0.05)' }}>
          <p style={{ fontWeight: 600, color: 'var(--text-heading)', margin: 0 }}>{task?.title}</p>
        </div>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>
          SELECT USER
        </label>
        <Form.Select onChange={e => setUserId(e.target.value)}>
          <option value="">-- Choose a team member --</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </Form.Select>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid var(--border)' }}>
        <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: 10 }}>Cancel</Button>
        <button className="btn-primary-app" onClick={handleAssign}>
          <FaUserPlus style={{ marginRight: 6 }} /> Assign
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default AssignModal
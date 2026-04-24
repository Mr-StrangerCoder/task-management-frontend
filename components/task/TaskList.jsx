import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FaTasks, FaUserPlus, FaSearch } from 'react-icons/fa'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')

  async function fetchTasks() {
    try {
      const res = await axiosInstance.get('/task/getAllTasks')
      if (res.data.success) setTasks(res.data.allTasks || [])
    } catch (error) { console.log(error) }
  }

  async function fetchUsers() {
    try {
      const res = await axiosInstance.get('/user/getAllUsers')
      console.log(res.data)
      if (res.data.success) setUsers(res.data.allUsers || [])
    } catch (error) { console.log(error); setUsers([]) }
  }

  useEffect(() => { fetchTasks(); fetchUsers() }, [])

  function handleRowClick(task) {
    setSelectedTask(task); setShow(true)
  }

  async function handleAssign() {
    if (!selectedUser) { toast.error('Please select user'); return }
    try {
      const res = await axiosInstance.post('/assignTask/assign', {
        user_id: selectedUser, task_id: selectedTask.id
      })
      if (res.data.success) {
        toast.success(res.data.msg)
        setShow(false)
        setSelectedUser('')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error assigning task')
    }
  }

  return (
    <div>
      <div className="page-header mb-4">
        <div className="page-header-icon"><FaTasks /></div>
        <h4>All Tasks</h4>
        <span
          style={{
            marginLeft: 'auto', background: 'rgba(99,102,241,0.1)',
            color: 'var(--primary)', borderRadius: 20, padding: '4px 14px',
            fontSize: '0.8rem', fontWeight: 700
          }}
        >
          {tasks.length} total
        </span>
      </div>

      <div className="app-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
            <FaSearch style={{ marginRight: 6 }} />
            Click any row to assign the task to a user
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table app-table mb-0">
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th style={{ width: 100, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <tr key={task.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(task)}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{task.title}</td>
                  <td><span className={`status-badge ${task.status}`}>{task.status}</span></td>
                  <td><span className={`priority-badge ${task.priority}`}>{task.priority}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <FaUserPlus style={{ color: 'var(--primary)', fontSize: '0.9rem' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: '1px solid var(--border)' }}>
          <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>
            <FaUserPlus style={{ marginRight: 8, color: 'var(--primary)' }} />
            Assign Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="app-card p-3 mb-3" style={{ background: 'rgba(99,102,241,0.05)' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-heading)', margin: 0 }}>{selectedTask?.title}</p>
            <div className="d-flex gap-2 mt-2">
              <span className={`status-badge ${selectedTask?.status}`}>{selectedTask?.status}</span>
              <span className={`priority-badge ${selectedTask?.priority}`}>{selectedTask?.priority}</span>
            </div>
          </div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
            SELECT USER
          </label>
          <Form.Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Choose a team member --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid var(--border)' }}>
          <Button variant="outline-secondary" onClick={() => setShow(false)} style={{ borderRadius: 10 }}>
            Cancel
          </Button>
          <button className="btn-primary-app" onClick={handleAssign}>
            <FaUserPlus style={{ marginRight: 6 }} /> Assign Task
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TaskList
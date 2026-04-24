import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Accordion, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FaLayerGroup, FaUser } from 'react-icons/fa'

const UsersWithTasks = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchUsers() {
    try {
      const res = await axiosInstance.get('/user/getUsersWithTasks')
      if (res.data.success) setUsers(res.data.users)
    } catch (error) {
      console.log(error)
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" style={{ color: 'var(--primary)' }} />
    </div>
  )

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon"><FaLayerGroup /></div>
        <h4>Users & Assigned Tasks</h4>
      </div>

      <Accordion defaultActiveKey="0" className="d-flex flex-column gap-2">
        {users.map((user, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={user.id}
            style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}
          >
            <Accordion.Header>
              <div className="d-flex align-items-center justify-content-between w-100 pe-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: '0.75rem', fontWeight: 700
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <strong style={{ color: 'var(--text-heading)' }}>{user.name}</strong>
                </div>
                <span
                  style={{
                    background: 'rgba(99,102,241,0.1)', color: 'var(--primary)',
                    borderRadius: 20, padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700
                  }}
                >
                  {user.AssignTasks?.length || 0} Tasks
                </span>
              </div>
            </Accordion.Header>

            <Accordion.Body style={{ background: 'var(--bg)' }}>
              {user.AssignTasks && user.AssignTasks.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {user.AssignTasks.map((assign, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between align-items-center app-card"
                      style={{ padding: '12px 16px' }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: 2 }}>
                          {assign.Task?.title}
                        </p>
                        <small style={{ color: 'var(--text-muted)' }}>
                          Priority: {assign.Task?.priority}
                        </small>
                      </div>
                      <span className={`status-badge ${assign.Task?.status}`}>
                        {assign.Task?.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                  No tasks assigned yet
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export default UsersWithTasks
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { FaUsers, FaSearch } from 'react-icons/fa'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])

  async function fetchUsers() {
    try {
      const res = await axiosInstance.get('/user/getAllUsers')
      if (res.data.success) {
        setUsers(res.data.allUsers || [])
        setFilteredUsers(res.data.allUsers || [])
      }
    } catch (error) { console.log(error) }
  }

  useEffect(() => { fetchUsers() }, [])

  useEffect(() => {
    let data = [...users]
    if (search) data = data.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredUsers(data)
  }, [search, users])

  return (
    <div>
      <div className="page-header mb-4">
        <div className="page-header-icon"><FaUsers /></div>
        <h4>All Users</h4>
        <span style={{ marginLeft: 'auto', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', borderRadius: 20, padding: '4px 14px', fontSize: '0.8rem', fontWeight: 700 }}>
          {filteredUsers.length} users
        </span>
      </div>

      {/* Search */}
      <div className="filter-bar mb-4">
        <FaSearch style={{ color: 'var(--text-muted)' }} />
        <input
          className="form-control"
          placeholder="Search users by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ border: 'none', background: 'transparent', boxShadow: 'none', flex: 1 }}
        />
      </div>

      <div className="app-card" style={{ overflow: 'hidden' }}>
        <table className="table app-table mb-0">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>User</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id || index}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: `hsl(${(user.name?.charCodeAt(0) * 15) % 360}, 60%, 60%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0
                        }}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.82rem' }}>
                    #{user.id}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers
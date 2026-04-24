import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Pagination } from 'react-bootstrap'
import { FaTasks, FaSearch } from 'react-icons/fa'

const MyTasks = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [statusMap, setStatusMap] = useState({})
  const [loadingId, setLoadingId] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [month, setMonth] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 10

  async function fetch_my_tasks() {
    const res = await axiosInstance.get('/assignTask/my_tasks')
    if (res.data.success) {
      setTasks(res.data.tasks)
      setFilteredTasks(res.data.tasks)
      const map = {}
      res.data.tasks.forEach(t => { map[t.Task.id] = t.Task.status })
      setStatusMap(map)
    }
  }

  useEffect(() => { fetch_my_tasks() }, [])

  useEffect(() => {
    let data = tasks
    if (search) data = data.filter(t => t.Task.title.toLowerCase().includes(search.toLowerCase()))
    if (status) data = data.filter(t => t.Task.status === status)
    if (priority) data = data.filter(t => t.Task.priority === priority)
    if (month) data = data.filter(t => {
      if (!t.Task.startDate) return false
      return new Date(t.Task.startDate).getMonth() + 1 === Number(month)
    })
    setFilteredTasks(data)
    setCurrentPage(1)
  }, [search, status, priority, month, tasks])

  const indexOfLast = currentPage * tasksPerPage
  const indexOfFirst = indexOfLast - tasksPerPage
  const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

  async function handleUpdate(taskId, status) {
    console.log(taskId, 'taskIdtaskIdtaskIdtaskIdtaskId')
    try {
      const res = await axiosInstance.patch(`/task/update_my_task/${taskId}`, { status })
      if (res.data.success) fetch_my_tasks()
    } catch (error) { console.log(error) }
  }

  const selectStyle = { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, padding: '6px 10px', fontSize: '0.82rem' }

  return (
    <div>
      <div className="page-header mb-4">
        <div className="page-header-icon"><FaTasks /></div>
        <h4>My Tasks</h4>
        <span style={{ marginLeft: 'auto', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', borderRadius: 20, padding: '4px 14px', fontSize: '0.8rem', fontWeight: 700 }}>
          {filteredTasks.length} tasks
        </span>
      </div>

      {/* Filters */}
      <div className="filter-bar mb-4">
        <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ minWidth: 180 }}>
          <FaSearch style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} />
          <input
            className="form-control form-control-sm"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: '4px 0' }}
          />
        </div>

        <select style={selectStyle} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select style={selectStyle} onChange={e => setPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select style={selectStyle} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
            <option key={i} value={i + 1}>{m}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="app-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table app-table mb-0">
            <thead>
              <tr>
                <th style={{ width: 50 }}>#</th>
                <th>Title</th>
                <th>Description</th>
                <th style={{ width: 160 }}>Status</th>
                <th>Priority</th>
                <th>Start</th>
                <th>End</th>
                <th style={{ width: 110 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((t, index) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{indexOfFirst + index + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{t.Task.title}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem', maxWidth: 200 }}>
                    <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {t.Task.description}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      defaultValue={t.Task.status}
                      onChange={e => setStatusMap(prev => ({ ...prev, [t.Task.id]: e.target.value }))}
                      style={{ borderRadius: 8, fontSize: '0.82rem' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td><span className={`priority-badge ${t.Task.priority}`}>{t.Task.priority}</span></td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {t.Task.startDate ? t.Task.startDate.split('T')[0] : '—'}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {t.Task.endDate ? t.Task.endDate.split('T')[0] : '—'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm fw-600"
                      style={{
                        background: 'rgba(16,185,129,0.1)', color: '#059669',
                        border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8,
                        fontSize: '0.78rem', fontWeight: 700
                      }}
                      onClick={() => handleUpdate(t.Task.id, statusMap[t.Task.id])}
                      disabled={loadingId === t.Task.id}
                    >
                      {loadingId === t.Task.id ? '...' : '✓ Save'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination size="sm">
            <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default MyTasks
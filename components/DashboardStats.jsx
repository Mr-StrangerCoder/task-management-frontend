import React, { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Row, Col } from 'react-bootstrap'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { FaTasks, FaUsers, FaCheckCircle, FaClock } from 'react-icons/fa'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const DashboardStats = () => {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])

  async function fetchData() {
    try {
      const taskRes = await axiosInstance.get('/task/getAllTasks')
      const userRes = await axiosInstance.get('/user/getAllUsers')
      if (taskRes.data.success) setTasks(taskRes.data.allTasks)
      if (userRes.data.success) setUsers(userRes.data.allUsers)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchData() }, [])

  const totalTasks = tasks.length
  const totalUsers = users.length
  const completed = tasks.filter(t => t.status === 'completed').length
  const pending = tasks.filter(t => t.status === 'pending').length
  const inprogress = tasks.filter(t => t.status === 'inprogress').length
  const high = tasks.filter(t => t.priority === 'high').length
  const medium = tasks.filter(t => t.priority === 'medium').length
  const low = tasks.filter(t => t.priority === 'low').length

  const pieData = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [{
      data: [completed, pending, inprogress],
      backgroundColor: ['#10b981', '#f59e0b', '#6366f1'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  }

  const barData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks by Priority',
      data: [high, medium, low],
      backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
      borderRadius: 8,
      borderSkipped: false
    }]
  }

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { weight: '600' } } },
      y: { grid: { color: 'rgba(0,0,0,0.04)' }, beginAtZero: true, ticks: { stepSize: 1 } }
    }
  }

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: <FaTasks />, gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
    { label: 'Total Users', value: totalUsers, icon: <FaUsers />, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { label: 'Completed', value: completed, icon: <FaCheckCircle />, gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
    { label: 'Pending', value: pending, icon: <FaClock />, gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon"><FaChartPie /></div>
        <h4>Dashboard Overview</h4>
      </div>

      <Row className="mb-4 g-3">
        {stats.map((s, i) => (
          <Col md={6} xl={3} key={i}>
            <div className="stat-card" style={{ background: s.gradient }}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p style={{ opacity: 0.85, fontSize: '0.8rem', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {s.label}
                  </p>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: 'white', margin: 0 }}>
                    {s.value}
                  </h2>
                </div>
                <div className="stat-card-icon">{s.icon}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <div className="app-card p-4 h-100">
            <h6 style={{ fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
              📌 Status Distribution
            </h6>
            <div style={{ maxWidth: 280, margin: '0 auto' }}>
              <Pie data={pieData} />
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="app-card p-4 h-100">
            <h6 style={{ fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
              ⚡ Priority Distribution
            </h6>
            <Bar data={barData} options={barOptions} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

// Fix missing import
import { FaChartPie } from 'react-icons/fa'

export default DashboardStats
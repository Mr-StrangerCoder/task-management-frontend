import React, { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Card, Row, Col } from 'react-bootstrap'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
)

const DashboardStats = () => {

    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])

    async function fetchData() {
        try {
            const taskRes = await axiosInstance.get('/tasks/getAllTasks')
            const userRes = await axiosInstance.get('/user/getAllUsers')

            if (taskRes.data.success) setTasks(taskRes.data.allTasks)
            if (userRes.data.success) setUsers(userRes.data.allUsers)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    
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
        datasets: [
            {
                data: [completed, pending, inprogress],
                backgroundColor: [
                    '#4CAF50', 
                    '#FF9800', 
                    '#2196F3' 
                ],
                borderWidth: 1
            }
        ]
    }


    const barData = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
            {
                label: 'Tasks by Priority',
                data: [high, medium, low],
                backgroundColor: [
                    '#f44336',
                    '#ffc107',
                    '#4caf50' 
                ]
            }
        ]
    }

    return (
        <div>

            <h4 className="mb-4 fw-bold text-dark">📊 Dashboard Overview</h4>

            
            <Row className="mb-4">
                <Col md={4}>
                    <Card className="text-white shadow-lg border-0"
                        style={{ background: 'linear-gradient(45deg, #36D1DC, #5B86E5)' }}>
                        <Card.Body>
                            <h6>Total Tasks</h6>
                            <h2>{totalTasks}</h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-white shadow-lg border-0"
                        style={{ background: 'linear-gradient(45deg, #ff9966, #ff5e62)' }}>
                        <Card.Body>
                            <h6>Total Users</h6>
                            <h2>{totalUsers}</h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-white shadow-lg border-0"
                        style={{ background: 'linear-gradient(45deg, #00c6ff, #0072ff)' }}>
                        <Card.Body>
                            <h6>Completed Tasks</h6>
                            <h2>{completed}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            
            <Row>
                <Col md={6}>
                    <Card className="p-3 shadow-lg border-0">
                        <h6 className="fw-bold">📌 Status Distribution</h6>
                        <Pie data={pieData} />
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="p-3 shadow-lg border-0">
                        <h6 className="fw-bold">⚡ Priority Distribution</h6>
                        <Bar data={barData} />
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default DashboardStats
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Table, Form, Row, Col, Pagination, Badge, Button } from 'react-bootstrap'

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
            // initialize statusMap

            const map = {}
            res.data.tasks.forEach(t => {
                map[t.Task.id] = t.Task.status
            })
            setStatusMap(map)
        }
    }

    useEffect(() => {
        fetch_my_tasks()
    }, [])


    useEffect(() => {
        let data = tasks


        if (search) {
            data = data.filter(t =>
                t.Task.title.toLowerCase().includes(search.toLowerCase())
            )
        }


        if (status) {
            data = data.filter(t => t.Task.status === status)
        }


        if (priority) {
            data = data.filter(t => t.Task.priority === priority)
        }


        if (month) {
            data = data.filter(t => {
                if (!t.Task.startDate) return false
                const taskMonth = new Date(t.Task.startDate).getMonth() + 1
                return taskMonth === Number(month)
            })
        }

        setFilteredTasks(data)
        setCurrentPage(1)

    }, [search, status, priority, month, tasks])


    const indexOfLast = currentPage * tasksPerPage
    const indexOfFirst = indexOfLast - tasksPerPage
    const currentTasks = filteredTasks.slice(indexOfFirst, indexOfLast)

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)


    const getStatusVariant = (status) => {
        switch (status) {
            case 'pending': return 'secondary'
            case 'inprogress': return 'warning'
            case 'completed': return 'success'
            default: return 'dark'
        }
    }

    const getPriorityVariant = (priority) => {
        switch (priority) {
            case 'high': return 'danger'
            case 'medium': return 'warning'
            case 'low': return 'info'
            default: return 'dark'
        }
    }


    async function handleUpdate(taskId, status) {
        console.log(taskId, "taskIdtaskIdtaskIdtaskIdtaskId")
        try {
            const res = await axiosInstance.patch(
                `/tasks/update_my_task/${taskId}`,
                { status }
            )

            if (res.data.success) {
                fetch_my_tasks()
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>

            <h4 className="mb-3">My Tasks</h4>


            <Row className="mb-3">

                <Col md={3}>
                    <Form.Control
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>

                <Col md={2}>
                    <Form.Select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </Form.Select>
                </Col>

                <Col md={2}>
                    <Form.Select onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Form.Select>
                </Col>

                <Col md={2}>
                    <Form.Select onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Month</option>
                        {[...Array(12)].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </Form.Select>
                </Col>

            </Row>


            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {currentTasks.map((t, index) => (
                        <tr key={t.id}>
                            <td>{indexOfFirst + index + 1}</td>
                            <td>{t.Task.title}</td>
                            <td>{t.Task.description}</td>


                            <td>
                                <Form.Select
                                    defaultValue={t.Task.status}
                                    onChange={(e) => setStatusMap(prev => ({ ...prev, [t.Task.id]: e.target.value }))}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Form.Select>
                            </td>

                            <td>
                                <Badge bg={getPriorityVariant(t.Task.priority)}>
                                    {t.Task.priority}
                                </Badge>
                            </td>

                            <td>
                                {t.Task.startDate
                                    ? t.Task.startDate.split('T')[0]
                                    : '-'}
                            </td>

                            <td>
                                {t.Task.endDate
                                    ? t.Task.endDate.split('T')[0]
                                    : '-'}
                            </td>

                            <td>
                                <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => handleUpdate(t.Task.id, statusMap[t.Task.id])}
                                    disabled={loadingId === t.Task.id}
                                >
                                    {loadingId === t.Task.id ? 'Updating...' : 'Update'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            <Pagination>

                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                />

                {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                        key={i}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                />

            </Pagination>

        </div>
    )
}

export default MyTasks
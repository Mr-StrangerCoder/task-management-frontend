import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Table, Modal, Button, Form, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'

const TaskList = () => {

    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])

    const [show, setShow] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedUser, setSelectedUser] = useState('')

    // 🔹 FETCH TASKS
    async function fetchTasks() {
    try {
        const res = await axiosInstance.get('/task/getAllTasks')

        if (res.data.success) {
            setTasks(res.data.allTasks || [])
        }

    } catch (error) {
        console.log(error)
    }
}

    // 🔹 FETCH USERS
    async function fetchUsers() {
    try {
        const res = await axiosInstance.get('/user/getAllUsers')
        console.log(res.data)

        if (res.data.success) {
            setUsers(res.data.allUsers || [])
        }

    } catch (error) {
        console.log(error)
        setUsers([]) // prevent crash
    }
}

    useEffect(() => {
        fetchTasks()
        fetchUsers()
    }, [])

    // 🔥 OPEN MODAL
    function handleRowClick(task) {
        setSelectedTask(task)
        setShow(true)
    }

    // 🔥 ASSIGN TASK
    async function handleAssign() {
        if (!selectedUser) {
            toast.error("Please select user")
            return
        }

        try {
            const res = await axiosInstance.post('/assignTask/assign', {
                user_id: selectedUser,
                task_id: selectedTask.id
            })

            if (res.data.success) {
                toast.success(res.data.msg)
                setShow(false)
                setSelectedUser('')
            }

        } catch (error) {
            console.log(error)
            toast.error("Error assigning task")
        }
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>

                <h4 className="mb-3 text-primary">All Tasks</h4>

                {/* 📋 TASK TABLE */}
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks?.map((task, index) => (
                            <tr
                                key={task.id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRowClick(task)}
                            >
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* 🔥 ASSIGN MODAL */}
                <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <p><strong>Task:</strong> {selectedTask?.title}</p>

                        <Form.Group>
                            <Form.Label>Select User</Form.Label>
                            <Form.Select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option value="">-- Select User --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAssign}>
                            Assign
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Card.Body>
        </Card>
    )
}

export default TaskList
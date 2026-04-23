import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { Accordion, Card, Spinner, Badge } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UsersWithTasks = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    // 🔹 FETCH DATA
    async function fetchUsers() {
        try {
            const res = await axiosInstance.get('/user/getUsersWithTasks')

            if (res.data.success) {
                setUsers(res.data.users)
            }

        } catch (error) {
            console.log(error)
            toast.error("Failed to load users")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    
    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        )
    }

    return (
        <div className="p-3">

            <h4 className="mb-4 text-primary">👥 Users & Assigned Tasks</h4>

            <Accordion defaultActiveKey="0">

                {users.map((user, index) => (
                    <Accordion.Item eventKey={index.toString()} key={user.id}>

                
                        <Accordion.Header>
                            <div className="d-flex justify-content-between w-100">
                                <span>
                                    👤 <strong>{user.name}</strong>
                                </span>

                                <Badge bg="info">
                                    {user.AssignTasks?.length || 0} Tasks
                                </Badge>
                            </div>
                        </Accordion.Header>

                    
                        <Accordion.Body>

                            {user.AssignTasks && user.AssignTasks.length > 0 ? (
                                user.AssignTasks.map((assign, i) => (
                                    <Card key={i} className="mb-2 shadow-sm border-0">
                                        <Card.Body className="d-flex justify-content-between">

                                            <div>
                                                <strong>{assign.Task?.title}</strong>
                                                <div className="text-muted small">
                                                    Status: {assign.Task?.status}
                                                </div>
                                            </div>

                                            <div>
                                                <Badge bg={
                                                    assign.Task?.status === 'completed'
                                                        ? 'success'
                                                        : assign.Task?.status === 'inprogress'
                                                            ? 'warning'
                                                            : 'secondary'
                                                }>
                                                    {assign.Task?.status}
                                                </Badge>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-muted">No tasks assigned</p>
                            )}

                        </Accordion.Body>

                    </Accordion.Item>
                ))}

            </Accordion>

        </div>
    )
}

export default UsersWithTasks
import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'

const CreateTask = () => {

    const [form, setForm] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'pending',
        priority: 'low'
    })

    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
    e.preventDefault()

    try {
        setLoading(true)

        const res = await axiosInstance.post('/task/create', form)

        console.log(res.data)

        if (res.data.success) {
            toast.success(res.data.msg)

            setForm({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                status: 'pending',
                priority: 'low'
            })
        } else {
            toast.error(res.data.msg || "Failed to create task")
        }

    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.msg || "Something went wrong")
    } finally {
        setLoading(false)
    }
}
    return (
        <Card className="shadow-sm">
            <Card.Body>

                <h4 className="mb-4 text-primary">Create Task</h4>

                <Form onSubmit={handleSubmit}>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={form.startDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={form.endDate}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className="mb-3">

                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="inprogress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Task'}
                    </Button>

                </Form>

            </Card.Body>
        </Card>
    )
}

export default CreateTask
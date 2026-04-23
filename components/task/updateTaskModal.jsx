import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const UpdateTaskModal = ({ show, handleClose, task, refresh }) => {

    const [form, setForm] = useState({})

    useEffect(() => {
        if (task) setForm(task)
    }, [task])

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleUpdate() {
        const res = await axiosInstance.put(
            `/tasks/updateTaskByAdmin/${task.id}`,
            form
        )

        if (res.data.success) {
            toast.success(res.data.msg)
            handleClose()
            refresh()
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form.Group className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        value={form.title || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        value={form.description || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={form.status || ''} onChange={handleChange}>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select name="priority" value={form.priority || ''} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </Form.Select>
                </Form.Group>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="success" onClick={handleUpdate}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateTaskModal
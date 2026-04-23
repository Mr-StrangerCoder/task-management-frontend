import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const AssignModal = ({ show, handleClose, task, users }) => {

    const [userId, setUserId] = useState('')

    async function handleAssign() {
        if (!userId) return toast.error("Select user")

        const res = await axiosInstance.post('/assignTask/assign', {
            user_id: userId,
            task_id: task.id
        })

        if (res.data.success) {
            toast.success(res.data.msg)
            handleClose()
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Assign Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p><b>{task?.title}</b></p>

                <Form.Select onChange={(e) => setUserId(e.target.value)}>
                    <option value="">Select User</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                </Form.Select>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAssign}>Assign</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AssignModal
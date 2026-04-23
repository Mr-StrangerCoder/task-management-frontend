import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'

const DeleteModal = ({ show, handleClose, task, refresh }) => {

    async function handleDelete() {
        const res = await axiosInstance.delete(`/tasks/deleteTask/${task.id}`)

        if (res.data.success) {
            toast.success("Deleted successfully")
            handleClose()
            refresh()
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure you want to delete <b>{task?.title}</b>?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
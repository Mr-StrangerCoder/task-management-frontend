import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa'

const DeleteModal = ({ show, handleClose, task, refresh }) => {
  async function handleDelete() {
    const res = await axiosInstance.delete(`/task/deleteTask/${task.id}`)
    if (res.data.success) { toast.success('Deleted successfully'); handleClose(); refresh() }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="sm">
      <Modal.Header closeButton style={{ borderBottom: '1px solid var(--border)' }}>
        <Modal.Title style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444' }}>
          <FaTrash style={{ marginRight: 8 }} /> Delete Task
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center py-4">
        <div
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(239,68,68,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', color: '#ef4444', fontSize: '1.5rem'
          }}
        >
          <FaExclamationTriangle />
        </div>
        <p style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: 8 }}>
          Are you sure?
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          You're about to delete <strong style={{ color: 'var(--text-heading)' }}>{task?.title}</strong>.
          This action cannot be undone.
        </p>
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid var(--border)', justifyContent: 'center', gap: 12 }}>
        <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: 10, minWidth: 100 }}>
          Cancel
        </Button>
        <button
          className="btn"
          onClick={handleDelete}
          style={{
            background: '#ef4444', color: 'white', border: 'none',
            borderRadius: 10, padding: '8px 20px', fontWeight: 700,
            minWidth: 100
          }}
        >
          <FaTrash style={{ marginRight: 6 }} /> Delete
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal
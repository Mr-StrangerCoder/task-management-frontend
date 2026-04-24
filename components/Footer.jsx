import React from 'react'
import { FaBolt } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--bg-navbar)',
        borderTop: '1px solid var(--border)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <div
          style={{
            width: 22, height: 22, borderRadius: 6,
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.65rem'
          }}
        >
          <FaBolt />
        </div>
        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-heading)' }}>TaskFlow</span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: 0 }}>
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
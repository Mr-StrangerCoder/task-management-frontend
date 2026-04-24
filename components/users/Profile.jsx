import { useOutletContext } from 'react-router-dom'
import { FaUser, FaShieldAlt, FaEnvelope, FaPhone } from 'react-icons/fa'

const Profile = () => {
  const { user } = useOutletContext()

  const formatName = (name) =>
    name?.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div>
      <div className="page-header mb-4">
        <div className="page-header-icon"><FaUser /></div>
        <h4>My Profile</h4>
      </div>

      <div className="app-card p-4" style={{ maxWidth: 560 }}>
        {/* Avatar + name */}
        <div className="d-flex align-items-center gap-4 mb-4">
          <div
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1.8rem', fontWeight: 700, flexShrink: 0
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h5 style={{ margin: 0, fontWeight: 700, color: 'var(--text-heading)' }}>
              {formatName(user?.name)}
            </h5>
            <span
              style={{
                display: 'inline-block', marginTop: 6,
                background: user?.role === 'admin' ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
                color: user?.role === 'admin' ? '#ef4444' : '#6366f1',
                borderRadius: 20, padding: '3px 12px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase'
              }}
            >
              {user?.role}
            </span>
          </div>
        </div>

        <hr style={{ borderColor: 'var(--border)' }} />

        {/* Info rows */}
        <div className="d-flex flex-column gap-3 mt-3">
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(99,102,241,0.1)', color: 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <FaUser style={{ fontSize: '0.85rem' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Full Name</p>
              <p style={{ fontWeight: 600, color: 'var(--text-heading)', margin: 0 }}>{formatName(user?.name)}</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(6,182,212,0.1)', color: '#06b6d4',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <FaShieldAlt style={{ fontSize: '0.85rem' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Role</p>
              <p style={{ fontWeight: 600, color: 'var(--text-heading)', margin: 0, textTransform: 'capitalize' }}>{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
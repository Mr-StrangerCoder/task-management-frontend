import { Card } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'

const Profile = () => {
  const { user } = useOutletContext()
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>

        <h4 className="mb-3">My Profile</h4>

        <p><strong>Name:</strong> {user?.name
          ?.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}</p>
        <p><strong>Role:</strong> {user?.role}</p>

      </Card.Body>
    </Card>
  )
}

export default Profile
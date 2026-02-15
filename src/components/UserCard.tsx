import React from 'react'
import { User } from '../types/User'
import { Link } from 'react-router-dom'

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="card">
      <Link to={`/profile/${user.id}`}><strong>{user.name}</strong></Link>
      <div className="small">{user.bio}</div>
      <div style={{marginTop:8}}>
        {user.specialties.map((s) => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </div>
  )
}

export default UserCard

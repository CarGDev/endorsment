import React from 'react'
import { Link } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const Navbar: React.FC = () => {
  const users = useAppStore((s) => s.users)
  const currentUserId = useAppStore((s) => s.currentUserId)
  const setCurrentUser = useAppStore((s) => s.setCurrentUser)
  const toggleCreatePost = useAppStore((s) => s.toggleCreatePost)

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div>
        <Link to="/">Researcher Endorsement</Link>
        <Link to="/create-user" style={{marginLeft:12}}>Create User</Link>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <select value={currentUserId ?? ''} onChange={(e) => setCurrentUser(e.target.value || null)}>
          <option value="">(No user)</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <button className="button" onClick={() => toggleCreatePost()} disabled={!currentUserId}>Create Post</button>
      </div>
    </div>
  )
}

export default Navbar

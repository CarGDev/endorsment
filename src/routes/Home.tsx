import React from 'react'
import Feed from '../components/Feed'
import UserCard from '../components/UserCard'
import useAppStore from '../store/useAppStore'

const Home: React.FC = () => {
  const users = useAppStore((s) => s.users)
  const currentUserId = useAppStore((s) => s.currentUserId)
  const suggestions = users.filter((u) => u.id !== currentUserId).slice(0, 3)

  return (
    <div className="container" style={{display:'flex',gap:16}}>
      <div style={{flex:1}}>
        <Feed />
      </div>
      <aside className="sidebar">
        <h3>Suggested Researchers</h3>
        {suggestions.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </aside>
    </div>
  )
}

export default Home

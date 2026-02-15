import React from 'react'
import { useParams } from 'react-router-dom'
import useAppStore from '../store/useAppStore'
import EndorseButton from '../components/EndorseButton'
import UserCard from '../components/UserCard'
import { formatTime } from '../utils/fileHelpers'

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const user = useAppStore((s) => s.users.find((u) => u.id === id))
  const posts = useAppStore((s) => s.posts.filter((p) => p.authorId === id))
  const endorseUser = useAppStore((s) => s.endorseUser)
  const currentUserId = useAppStore((s) => s.currentUserId)
  const endorsementHistory = useAppStore((s) => s.endorsementHistory)
  const allUsers = useAppStore((s) => s.users)
  const addNotification = useAppStore((s) => s.addNotification)

  if (!user) return <div className="card">User not found</div>

  const onEmailClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!currentUserId) {
      addNotification('Select a current user (top-right) to endorse from.', 'error')
      return
    }
    if (currentUserId === user.id) {
      addNotification("You can't endorse yourself.", 'error')
      return
    }
    const specialty = user.specialties[0] ?? 'General'
    endorseUser(user.id, specialty)
    addNotification(`Endorsed ${user.name} for ${specialty}`, 'success')
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{user.name}</h2>
        <div className="small"><a href="#" onClick={onEmailClick}>{user.email}</a></div>
        <div className="small">{user.bio}</div>
        <div style={{marginTop:8}}>
          {user.specialties.map((s) => (
            <div key={s} style={{display:'flex',alignItems:'center',gap:8,marginTop:6}}>
              <span className="tag">{s}</span>
              <div className="small">Endorsements: {user.endorsements[s] ?? 0}</div>
              <div>
                <EndorseButton onClick={() => endorseUser(user.id, s)} count={user.endorsements[s] ?? 0} disabled={currentUserId === user.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {(() => {
        const recent = endorsementHistory.filter((e) => e.type === 'user' && e.toUserId === id).slice(0,5)
        if (recent.length === 0) return null
        return (
          <div className="card" style={{marginTop:8}}>
            <h4>Recent endorsements</h4>
            {recent.map((r) => {
              const byName = allUsers.find((u) => u.id === r.by)?.name ?? 'Someone'
              return <div key={r.id} className="small">{byName} endorsed {r.specialty} · {formatTime(r.createdAt)} ago</div>
            })}
          </div>
        )
      })()}

      <h3>Posts</h3>
      {posts.length === 0 && <div className="card">No posts yet.</div>}
      {posts.map((p) => (
        <div key={p.id} className="card">
          <UserCard user={user} />
          <div style={{marginTop:8}}>{p.content}</div>
        </div>
      ))}
    </div>
  )
}

export default Profile

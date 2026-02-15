import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const CreateUser: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [specialties, setSpecialties] = useState('')
  const createUser = useAppStore((s) => s.createUser)
  const addNotification = useAppStore((s) => s.addNotification)
  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = specialties.split(',').map((s) => s.trim()).filter(Boolean)
    if (!name || !email || !bio || parsed.length === 0) {
      addNotification('All fields required and at least one specialty', 'error')
      return
    }
    const newUser = createUser({ name, email, bio, specialties: parsed })
    navigate(`/profile/${newUser.id}`)
  }

  return (
    <div className="create-account-bg" style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div className="create-card">
        <h2>Create Account</h2>
        <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',gap:12}}>
          <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <textarea className="input" placeholder="Short bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          <input className="input" placeholder="Specialties (comma separated)" value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
          <div style={{display:'flex',justifyContent:'center',marginTop:8}}>
            <button className="btn-gradient" type="submit">SIGN UP</button>
            <button type="button" className="btn-ghost" onClick={() => navigate('/')}>SIGN IN</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUser

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const CreateUser: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [specialties, setSpecialties] = useState('')
  const createUser = useAppStore((s) => s.createUser)
  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = specialties.split(',').map((s) => s.trim()).filter(Boolean)
    if (!name || !email || !bio || parsed.length === 0) return alert('All fields required and at least one specialty')
    const newUser = createUser({ name, email, bio, specialties: parsed })
    navigate(`/profile/${newUser.id}`)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Create User</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Bio</label>
            <input value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <label>Specialties (comma separated)</label>
            <input value={specialties} onChange={(e) => setSpecialties(e.target.value)} />
          </div>
          <div style={{marginTop:8}}>
            <button className="button" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUser

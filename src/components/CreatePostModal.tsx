import React, { useState, startTransition } from 'react'
import useAppStore from '../store/useAppStore'

const CreatePostModal: React.FC = () => {
  const isOpen = useAppStore((s) => s.ui.isCreatePostOpen)
  const toggle = useAppStore((s) => s.toggleCreatePost)
  const currentUserId = useAppStore((s) => s.currentUserId)
  const createPost = useAppStore((s) => s.createPost)

  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId) {
      setError('Select a user first')
      return
    }
    if (!content.trim()) {
      setError('Content required')
      return
    }
    setError(null)
    startTransition(() => {
      const attachedPDF = file ? { name: file.name, url: URL.createObjectURL(file) } : undefined
      createPost({ authorId: currentUserId, content: content.trim(), attachedPDF })
      toggle()
      setContent('')
      setFile(null)
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create Post</h3>
        <form onSubmit={onSubmit}>
          <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
          <div style={{marginTop:8}}>
            <input type="file" accept="application/pdf" onChange={(e) => {
              const f = e.target.files && e.target.files[0]
              if (f && f.type !== 'application/pdf') {
                setError('Only PDF files allowed')
                return
              }
              setFile(f ?? null)
            }} />
          </div>
          {error && <div style={{color:'red'}}>{error}</div>}
          <div style={{marginTop:8,display:'flex',justifyContent:'flex-end',gap:8}}>
            <button type="button" onClick={() => toggle()}>Cancel</button>
            <button className="button" type="submit" disabled={!currentUserId}>Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal

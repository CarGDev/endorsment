import React, { useState, startTransition } from 'react'
import useAppStore from '../store/useAppStore'
import { generateRandomMarkdown } from '../utils/fileHelpers'
import MarkdownPreview from './MarkdownPreview'

const CreatePostModal: React.FC = () => {
  const isOpen = useAppStore((s) => s.ui.isCreatePostOpen)
  const toggle = useAppStore((s) => s.toggleCreatePost)
  const currentUserId = useAppStore((s) => s.currentUserId)
  const createPost = useAppStore((s) => s.createPost)

  const [content, setContent] = useState('')
  const [attachedMarkdown, setAttachedMarkdown] = useState<{name:string,content:string} | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const onGenerate = () => {
    const md = generateRandomMarkdown()
    setAttachedMarkdown(md)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId) {
      setError('Select a user first')
      return
    }
    if (!content.trim() && !attachedMarkdown) {
      setError('Content or markdown required')
      return
    }
    setError(null)
    startTransition(() => {
      createPost({ authorId: currentUserId, content: content.trim(), attachedMarkdown: attachedMarkdown ?? undefined })
      toggle()
      setContent('')
      setAttachedMarkdown(null)
    })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create Post</h3>
        <form onSubmit={onSubmit}>
          <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
          <div style={{marginTop:8}}>
            <button type="button" className="button" onClick={onGenerate}>Generate Markdown</button>
            {attachedMarkdown && <div style={{marginTop:8}}><MarkdownPreview content={attachedMarkdown.content} /></div>}
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

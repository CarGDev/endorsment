import React from 'react'
import useAppStore from '../store/useAppStore'
import PDFPreview from './PDFPreview'

const PDFModal: React.FC = () => {
  const selectedPostId = useAppStore((s) => s.selectedPostId)
  const setSelectedPost = useAppStore((s) => s.setSelectedPost)
  const post = useAppStore((s) => s.posts.find((p) => p.id === selectedPostId))

  if (!selectedPostId || !post?.attachedPDF) return null

  return (
    <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3>{post.attachedPDF.name}</h3>
          <button onClick={() => setSelectedPost(null)}>Close</button>
        </div>
        <div style={{marginTop:8}}>
          <PDFPreview url={post.attachedPDF.url} name={post.attachedPDF.name} />
        </div>
      </div>
    </div>
  )
}

export default PDFModal

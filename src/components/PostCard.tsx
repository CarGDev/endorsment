import React, { memo } from 'react'
import { Post } from '../types/Post'
import useAppStore from '../store/useAppStore'
import { Link } from 'react-router-dom'
import { formatTime } from '../utils/fileHelpers'
import PDFPreview from './PDFPreview'

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const author = useAppStore((s) => s.users.find((u) => u.id === post.authorId))
  const endorsePost = useAppStore((s) => s.endorsePost)

  if (!author) return null

  return (
    <div className="card">
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <Link to={`/profile/${author.id}`}><strong>{author.name}</strong></Link>
          <div className="small">{formatTime(post.createdAt)} ago</div>
        </div>
        <div style={{display:'flex',gap:6}}>
          {author.specialties.map((sp) => (
            <span key={sp} className="tag">{sp}</span>
          ))}
        </div>
      </div>
      <p style={{marginTop:8}}>{post.content}</p>
      {post.attachedPDF && (
        <div style={{marginTop:8}}>
          <PDFPreview url={post.attachedPDF.url} name={post.attachedPDF.name} />
        </div>
      )}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <div>
          <button className="button" onClick={() => endorsePost(post.id)}>Endorse Post ({post.endorsements})</button>
          <Link to={`/post/${post.id}`} style={{marginLeft:8}}>View</Link>
        </div>
      </div>
    </div>
  )
}

export default memo(PostCard)

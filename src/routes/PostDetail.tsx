import React from 'react'
import { useParams } from 'react-router-dom'
import useAppStore from '../store/useAppStore'
import PDFPreview from '../components/PDFPreview'

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const post = useAppStore((s) => s.posts.find((p) => p.id === id))
  const author = useAppStore((s) => s.users.find((u) => u.id === post?.authorId))
  const endorsePost = useAppStore((s) => s.endorsePost)

  if (!post) return <div className="card">Post not found</div>

  return (
    <div className="container">
      <div className="card">
        <h3>{author?.name}</h3>
        <div className="small">{author?.bio}</div>
        <div style={{marginTop:8}}>{post.content}</div>
        {post.attachedPDF && <PDFPreview url={post.attachedPDF.url} name={post.attachedPDF.name} />}
        <div style={{marginTop:8}}>
          <button className="button" onClick={() => endorsePost(post.id)}>Endorse Post ({post.endorsements})</button>
        </div>
      </div>
    </div>
  )
}

export default PostDetail

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import MarkdownPreview from '../components/MarkdownPreview';
import { generateToken } from '../utils/fileHelpers';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = useAppStore((s) => s.posts.find((p) => p.id === id));
  const author = useAppStore((s) => s.users.find((u) => u.id === post?.authorId));
  const endorsePost = useAppStore((s) => s.endorsePost);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const addNotification = useAppStore((s) => s.addNotification);

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!post) return <div className="card">Post not found</div>;

  const handleEndorse = async () => {
    if (!currentUserId) {
      addNotification('Select a current user (top-right) to endorse from.', 'error');
      return;
    }
    if (currentUserId === post.authorId) {
      addNotification("You can't endorse your own post.", 'error');
      return;
    }
    endorsePost(post.id);
    const token = generateToken(6);
    const url = `https://arxiv.org/auth/endorse?x=${token}`;
    setShareUrl(url);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      addNotification('Share link copied to clipboard', 'success');
    } catch {
      // ignore
    }
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addNotification('Share link copied to clipboard', 'success');
    } catch {
      addNotification('Could not copy share link', 'error');
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 12 }}>
        <Link to="/">← Home</Link>
      </div>
      <div className="card">
        <h3>{author?.name}</h3>
        <div className="small">{author?.bio}</div>
        <div style={{ marginTop: 8 }}>{post.content}</div>
        {post.attachedMarkdown && <MarkdownPreview content={post.attachedMarkdown.content} />}
        <div style={{ marginTop: 8 }}>
          <button className="button" onClick={handleEndorse}>
            Endorse Post ({post.endorsements})
          </button>
          {shareUrl && (
            <div className="small" style={{ marginTop: 8 }}>
              Share link:{' '}
              <a href={shareUrl} target="_blank" rel="noreferrer">
                {shareUrl}
              </a>
              <button style={{ marginLeft: 8 }} onClick={handleCopy}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

import React, { memo, useState } from 'react';
import { Post } from '../types/Post';
import useAppStore from '../store/useAppStore';
import { Link, useNavigate } from 'react-router-dom';
import { formatTime, generateToken } from '../utils/fileHelpers';
import MarkdownPreview from './MarkdownPreview';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const author = useAppStore((s) => s.users.find((u) => u.id === post.authorId));
  const endorsePost = useAppStore((s) => s.endorsePost);
  const setSelectedPost = useAppStore((s) => s.setSelectedPost);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const addNotification = useAppStore((s) => s.addNotification);
  const navigate = useNavigate();

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!author) return null;

  const handleEndorse = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        addNotification('Share link copied to clipboard', 'success');
      } else {
        const area = document.createElement('textarea');
        area.value = url;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
        setCopied(true);
        addNotification('Share link copied to clipboard', 'success');
      }
    } catch (e) {
      console.error('copy failed', e);
      addNotification('Could not copy share link', 'error');
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopy = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      addNotification('Share link copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addNotification('Could not copy share link', 'error');
    }
  };

  return (
    <div
      className="card post-card"
      onClick={() => navigate(`/post/${post.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Link to={`/profile/${author.id}`} onClick={(e) => e.stopPropagation()}>
            <strong>{author.name}</strong>
          </Link>
          <div className="small">{formatTime(post.createdAt)} ago</div>
        </div>
        <div className="tags-row">
          {author.specialties.map((sp) => (
            <span key={sp} className="tag">
              {sp}
            </span>
          ))}
        </div>
      </div>
      <p style={{ marginTop: 8 }}>{post.content}</p>
      {post.attachedMarkdown && (
        <div style={{ marginTop: 8 }}>
          <div className="small">{post.attachedMarkdown.name}</div>
          <div style={{ marginTop: 6 }}>
            <MarkdownPreview content={post.attachedMarkdown.content} />
          </div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <div>
          <button
            className="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEndorse(e);
            }}
          >
            Endorse Post ({post.endorsements})
          </button>
          <button
            className="button"
            style={{ marginLeft: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPost(post.id);
            }}
          >
            Open MD
          </button>
        </div>
      </div>
      {shareUrl && (
        <div className="small" style={{ marginTop: 8 }}>
          Share link:{' '}
          <a href={shareUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            {shareUrl}
          </a>
          <button
            style={{ marginLeft: 8 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(e);
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(PostCard);

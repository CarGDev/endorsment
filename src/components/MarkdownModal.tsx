import React from 'react';
import useAppStore from '../store/useAppStore';
import MarkdownPreview from './MarkdownPreview';

const MarkdownModal: React.FC = () => {
  const selectedPostId = useAppStore((s) => s.selectedPostId);
  const setSelectedPost = useAppStore((s) => s.setSelectedPost);
  const post = useAppStore((s) => s.posts.find((p) => p.id === selectedPostId));

  if (!selectedPostId || !post?.attachedMarkdown) return null;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedPost(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{post.attachedMarkdown.name}</h3>
          <button onClick={() => setSelectedPost(null)}>Close</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <MarkdownPreview content={post.attachedMarkdown.content} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownModal;

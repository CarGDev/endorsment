import React from 'react';
import useAppStore from '../store/useAppStore';
import PostCard from './PostCard';

const Feed: React.FC = () => {
  const posts = useAppStore((s) => s.posts);
  const sorted = [...posts].sort((a, b) => b.createdAt - a.createdAt);
  if (sorted.length === 0) return <div className="card">No posts yet.</div>;
  return (
    <div>
      {sorted.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
};

export default Feed;

import React from 'react';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const currentUserId = useAppStore((s) => s.currentUserId);
  const endorseUser = useAppStore((s) => s.endorseUser);
  const addNotification = useAppStore((s) => s.addNotification);

  const onEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUserId) {
      addNotification('Select a current user (top-right) to endorse from.', 'error');
      return;
    }
    if (currentUserId === user.id) {
      addNotification("You can't endorse yourself.", 'error');
      return;
    }
    const specialty = user.specialties[0] ?? 'General';
    endorseUser(user.id, specialty);
    addNotification(`Endorsed ${user.name} for ${specialty}`, 'success');
  };

  return (
    <div className="card">
      <Link to={`/profile/${user.id}`}>
        <strong>{user.name}</strong>
      </Link>
      <div className="small">
        <a href="#" onClick={onEmailClick}>
          {user.email}
        </a>
      </div>
      <div className="small">{user.bio}</div>
      <div className="tags-row" style={{ marginTop: 8 }}>
        {user.specialties.map((s) => (
          <span key={s} className="tag">
            {s} ({user.endorsements[s] ?? 0})
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;

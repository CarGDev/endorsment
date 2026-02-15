import React from 'react';
import useAppStore from '../store/useAppStore';

const NotificationCenter: React.FC = () => {
  const notifications = useAppStore((s) => s.notifications);
  const removeNotification = useAppStore((s) => s.removeNotification);

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notif-container">
      {notifications.map((n) => (
        <div key={n.id} className={`notif ${n.type ?? ''}`}>
          <div>{n.message}</div>
          <button onClick={() => removeNotification(n.id)}>×</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;

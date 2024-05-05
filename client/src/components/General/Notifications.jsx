import React, { useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'You have a new message', timestamp: Date.now(), read: false },
    { id: 2, message: 'Your order has been shipped', timestamp: Date.now() - 1000 * 60 * 30, read: true },
    { id: 3, message: 'New updates available', timestamp: Date.now() - 1000 * 60 * 60 * 2, read: false },
  ]);
  const [unreadCount, setUnreadCount] = useState(2); // Assuming 2 unread notifications initially

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    setUnreadCount(unreadCount - 1);
  };

  return (
    <div className="notification-container bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${notification.read ? 'text-gray-500' : 'text-black'} bg-white p-2 rounded mb-2 cursor-pointer transition-colors duration-300 hover:bg-gray-200 relative`}
              onClick={() => {
                if (!notification.read) {
                  markAsRead(notification.id);
                }
              }}
            >
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time text-sm text-gray-400">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  }).format(notification.timestamp)}
                </span>
              </div>
              <span className={`notification-label absolute top-0 right-0 px-2 py-1 rounded ${notification.read ? 'bg-gray-300 text-gray-700' : 'bg-red-500 text-white'}`}>
                {notification.read ? 'Read' : 'Unread'}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="unread-count text-gray-500 mt-4">{unreadCount} unread notifications</p>
    </div>
  );
}

export default Notifications;

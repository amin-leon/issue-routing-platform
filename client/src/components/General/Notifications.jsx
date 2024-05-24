import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { notificationActions } from '../../redux/notifications/notificationSlice';

function Notifications() {
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications);
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();

  const filteredNotifications = () => {
    switch (filter) {
      case 'all':
        return notifications;
      case 'read':
        return notifications.filter((notification) => notification.isRead);
      case 'unread':
        return notifications.filter((notification) => !notification.isRead);
      default:
        return notifications;
    }
  };

  const markAsRead = async (notificationId, issueId, link) => {
    try {
      await axios.put(`http://localhost:8080/notifications/${notificationId}`, {
        isRead: true,
      });
      dispatch(notificationActions.removeNotification(notificationId));
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await axios.delete(`http://localhost:8080/notifications/${user._id}`);
      dispatch(notificationActions.clearNotifications());
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <div className="notification-container bg-gray-100 px-48 h-screen">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-semibold">Filter:</label>
        <select
          id="filter"
          className="border rounded px-10 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
        <button 
          onClick={clearAllNotifications}
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
        >
          Clear all
        </button>
      </div>
      <ul className="notification-list">
        {filteredNotifications().map((notification) => (
          <li
            key={notification._id}
            className={`notification-item ${notification.isRead ? 'text-gray-500' : 'text-black'} bg-white p-2 rounded mb-2 cursor-pointer transition-colors duration-300 hover:bg-gray-200 relative`}
            onClick={() => {
              if (!notification.isRead) {
                markAsRead(notification._id);
              }
            }}
          >
            <Link to={notification.link}>
              <div className="notification-content">
                <p>{notification.content}</p>
                <span className="notification-time text-sm text-gray-400">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(notification.timestamp)}
                </span>
              </div>
            </Link>
            <span className={`notification-label absolute top-0 right-0 px-2 py-1 rounded ${notification.isRead ? 'bg-gray-300 text-gray-700' : 'bg-red-500 text-white'}`}>
              {notification.isRead ? 'Read' : 'Unread'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;

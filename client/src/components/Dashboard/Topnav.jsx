import React, { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/authSlice';
import axios from 'axios';
import { notificationActions } from '../../redux/notifications/notificationSlice';




const Topnav = () => {
  const user = useSelector((user) => user.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications.filter(notification => !notification.isRead));
  const dispatch = useDispatch()



  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authActions.logoutUser());
    e.preventDefault();
  };

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/notifications/${user._id}`);
  //     dispatch(notificationActions.setNots(response.data));
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //   }
  // };

  // const startPolling = () => {
  //   setInterval(fetchNotifications, 500);
  // };

  // startPolling();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${user._id}`);
        const userNotifications = response.data;
        dispatch(notificationActions.setNots(userNotifications));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [dispatch, user._id]);


  return (
    <div className="bg-white text-gray-700 h-24 flex justify-between items-center px-6 shadow-md">
      <div className="flex items-center">
        <div className="flex items-center text-black flex-grow justify-center">
          <p>NPC</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="relative group">
          <div className="mr-3 flex items-center gap-3">
            <Link to='my/notifications'>
              <IoMdNotificationsOutline className="text-3xl relative text-black"/>
            </Link>
            {notifications.length > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 ml-3 absolute top-[-6px] left-0">
                {notifications.length}
              </span>
            )}
            <button className="focus:outline-none" onClick={handleLogout}>
              <MdPowerSettingsNew className="text-2xl text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;

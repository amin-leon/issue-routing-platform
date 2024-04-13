import React, { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdPowerSettingsNew } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { issueActions } from '../../redux/issue/issueSlice';
import { MdDynamicFeed } from "react-icons/md";




const Topnav = () => {
  const user = useSelector((user)=> user.auth.user);
  const notifications = useSelector((user)=> user.issue.unReadNots);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(authActions.logoutUser());
    e.preventDefault();
    
  };
  // fecth notification

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notification/${user._id}`);
        const userNotifications = response.data;
        dispatch(issueActions.setNots(userNotifications));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [dispatch, user._id]); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Update read button
  const navigate = useNavigate()
  const handleRead = async (notificationId, issueId) => {
    try {
      await axios.put(`http://localhost:8080/notification/${notificationId}`, {
        isRead: true,
      });
      // Navigate to the issue page
      dispatch(issueActions.removeReadedNots(notificationId));
      navigate(`/Home/manage-issue/${issueId}`);
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

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
              <IoMdNotificationsOutline className="text-3xl relative text-black" 
                onClick={toggleDropdown}

              />
              {notifications.length > 0 && (
                <span className="bg-red-500 text-black rounded-full px-2 ml-3 absolute top-[-6px] left-0" onClick={toggleDropdown}>
                  {notifications.length}
                </span>
              )}
              {/* Feedbacks */}
              <MdDynamicFeed  className="text-3xl relative text-black" 
                onClick={toggleDropdown}
              />
              {notifications.length > 0 && (
                <span className="bg-red-500 text-black rounded-full px-2 ml-3 absolute top-[-6px] left-0" onClick={toggleDropdown}>
                  {notifications.length}
                </span>
              )}
        {notifications.length > 0 && isDropdownOpen && (
        <div className="relative right-0 mt-10 bg-white border rounded shadow-md py-10">
          {notifications.map((notification) => (
            <div key={notification._id} onClick={()=> handleRead(notification._id, notification.relatedIssue)} className='cursor-pointer hover:bg-red-500'>
              <p>{notification.content}</p>
            </div>
          ))}
        </div>
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

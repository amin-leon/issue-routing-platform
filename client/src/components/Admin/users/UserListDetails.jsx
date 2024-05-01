import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { authActions } from "../../../redux/auth/authSlice";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';



const schema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  position: Yup.string().required('Position is required'),
});



const UserDetailsPage = () => {
  const navigate = useNavigate()
  const userId = useParams();
  const id = userId.userId;
  const dispatch = useDispatch();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [approvalConfirmed, setApprovalConfirmed] = useState(false);

  const [role, setRole] = useState('');
  const [position, setPosition] = useState('');
  const [roleError, setRoleError] = useState('');
  const [positionError, setPositionError] = useState('');


  const users = useSelector((state) => state.auth.users);
  const pendingUsers = users.filter((user) => user._id === id);

  const ApproveUser = () => {
    // Show the success pop-up
    setShowSuccessPopup(true);
  }

  const handleConfirmApproval = async (event) => {
    event.preventDefault(); // Prevent the form from submitting
    
    try {
      await schema.validate({ role, position }, { abortEarly: false });
  
      // If validation passes, proceed with the approval process
      await axios.put(`http://localhost:8080/auth/approve/${id}`, { role, position });
      dispatch(authActions.approveAccount(id));
      navigate('/Home/admin/manage');
      setShowSuccessPopup(false);
      setApprovalConfirmed(true);
    } catch (error) {
      // If validation fails, display the error messages
      if (error.name === 'ValidationError') {
        error.inner.forEach((e) => {
          if (e.path === 'role') {
            setRoleError(e.message);
          }
          if (e.path === 'position') {
            setPositionError(e.message);
          }
        });
      }
    }
  };
  
  

  const handleCancelApproval = () => {
    // Close the success pop-up without taking any action
    setShowSuccessPopup(false);
    setApprovalConfirmed(false);
  }

  // Wrap the handleRejectUser function in an anonymous function
  const handleRejectUser = async (accountId) => {
    try {
      await axios.delete(`http://localhost:8080/auth/reject/${accountId}`);
      dispatch(authActions.rejectUser(accountId));
      navigate('/Home/admin/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

      // Activate User
      const ActivateAccount = async (userId) => {
        try {
          await axios.put(`http://localhost:8080/auth/activate/${userId}`);
          dispatch(authActions.activateAccount(userId));
          dispatch(authActions.setUsersAfterApprove(userId));
          navigate('/Home/admin/users');
        } catch (error) {
          console.error('Error:', error);
        }
      }

  // Deactivate user
  const DeactivateAccount = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/auth/deactivate/${userId}`);
      dispatch(authActions.deactivateAccount(userId));
      dispatch(authActions.setUsersAfterApprove(userId));
      navigate('/Home/admin/users');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-16">
        {pendingUsers?.length === 0 ? (
          <div className="mt-32">No User Available</div>
        ) : (
            pendingUsers?.map((userData, index) => (
              <div className="grid grid-cols-2 gap-4 max-w-screen-lg mx-auto bg-white p-8 rounded shadow-md">
        
              {/* Left Part */}
              <div className="border p-8">
                <div className="mb-6">
                  {userData?.profile !=null ? (
                   <img
                    src={`http://localhost:8080/${userData?.profile}`} 
                    alt="User"
                    className="max-w-full h-auto rounded"
                    />
                  ):(
                    <img
                    src="https://media.istockphoto.com/id/1016744034/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=Rqti26VQj_fs-_hL15mJj6b84FEZNa00FJgZRaG5PD4=" 
                    alt="User"
                    className="max-w-full h-auto rounded"
                    />
                  )}
                </div>
                <div>
                  {/* Other user details information */}
                  <p className="text-xl font-semibold mb-2">Names</p>
                  <p className="text-gray-700">{userData?.fullName}</p>
                  {/* Add more user details here */}
                </div>
              </div>
      
              {/* Right Part */}
              <div className="border p-8">
                {/* Other related info */}
                <div className="mb-6">
                  <p className="text-xl font-semibold mb-2">Other Info</p>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-gray-700">Username: {userData?.username}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-gray-700">Class: {userData?.level}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-gray-700">Email: {userData?.email}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-gray-700">Role: {userData?.role}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="text-gray-700">accountStatus: {userData?.accountStatus}</p>
                  </div>
                  {/* Add more related info here */}
                </div>
      
                {/* Buttons */}
                <div>
                {userData?.approvalStatus === 'pending' && 
                    <div>
                      <button className="bg-blue-500 hover-bg-blue-700 text-white p-2 mt-3 rounded-sm" onClick={ApproveUser}> Approve
                      </button>
                      <button className="bg-red-500 ml-3 text-white p-2 mt-3 rounded-sm" onClick={() => handleRejectUser(userData?._id)}> Reject
                      </button>
                    </div>
                }
                {userData?.accountStatus === 'inactive' && 
                    <div>
                      <button className='bg-green-500 p-1 text-white rounded-sm text-xs' onClick={()=> ActivateAccount(userData?._id)}>Activate</button>
                    </div>
                }
                {userData?.accountStatus === 'active' && 
                    <div>
                        <button className='bg-red-500 p-1 text-white rounded-sm text-xs' onClick={() => DeactivateAccount(userData._id)}>Deactivate</button>
                    </div>
                }
                  
                </div>
              </div>
            </div>
            ))
        )}

      {/* comfirmation pop up ........... */}
      {showSuccessPopup && !approvalConfirmed && (
        <form className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Approval Confirmation</h2>
                <span className="text-gray-500 text-2xl cursor-pointer" onClick={handleCancelApproval}>
                  &times;
                </span>
              </div>
              <div className="mt-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${roleError && 'border-red-500'}`}
              >
                <option value="">Select Role</option>
                <option value="Staff">Staff</option>
                <option value="Student">Student</option>
              </select>
              {roleError && <p className="mt-1 text-red-500 text-sm">{roleError}</p>}
            </div>
            <div className="mt-4">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Select Position</label>
              <select
                id="position"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={`w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${positionError && 'border-red-500'}`}
              >
                <option value="">Select Position</option>
                <option value="Admin">Admin</option>
                <option value="Ci">Ci</option>
                <option value="Cmdt">Cmdt</option>
                <option value="Io">Io</option>
                <option value="Rogistic">Rogistic</option>
                <option value="Academia">Academia</option>
                <option value="Student">Student</option>
              </select>
              {positionError && <p className="mt-1 text-red-500 text-sm">{positionError}</p>}
            </div>

              <div className="mt-6 flex justify-center">
                <button type='submit'
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                  onClick={handleConfirmApproval}
                >
                  Confirm
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={handleCancelApproval}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
        )}
    </div>
  );
};

export default UserDetailsPage;





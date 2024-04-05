// import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import axios from 'axios';
// import { authActions } from "../../../redux/auth/authSlice";
// import { useNavigate, useParams } from 'react-router-dom';

// // ... (other imports and code)

// function UserListDetails() {
    // const navigate = useNavigate()
    // const userId = useParams();
    // const id = userId.userId;
    // const dispatch = useDispatch();
    // const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    // const [approvalConfirmed, setApprovalConfirmed] = useState(false);
  
    // const users = useSelector((state) => state.auth.users);
    // const pendingUsers = users.filter((user) => user._id === id);
  
    // const ApproveUser = () => {
    //   // Show the success pop-up
    //   setShowSuccessPopup(true);
    // }
  
    // const handleConfirmApproval = async () => {
    //   try {
    //     await axios.put(`http://localhost:8080/auth/approve/${id}`);
    //     dispatch(authActions.approveAccount(id));
    //     navigate('/Home/admin/users');
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
  
    //   // Close the success pop-up
    //   setShowSuccessPopup(false);
    //   setApprovalConfirmed(true);
    // }
  
    // const handleCancelApproval = () => {
    //   // Close the success pop-up without taking any action
    //   setShowSuccessPopup(false);
    //   setApprovalConfirmed(false);
    // }
  
    // // Wrap the handleRejectUser function in an anonymous function
    // const handleRejectUser = async (accountId) => {
    //   try {
    //     await axios.delete(`http://localhost:8080/auth/reject/${accountId}`);
    //     dispatch(authActions.rejectUser(accountId));
    //     navigate('/Home/admin/users');
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // };

    //     // Activate User
    //     const ActivateAccount = async (userId) => {
    //       try {
    //         await axios.put(`http://localhost:8080/auth/activate/${userId}`);
    //         dispatch(authActions.activateAccount(userId));
    //         dispatch(authActions.setUsersAfterApprove(userId));
    //         navigate('/Home/admin/users');
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    //     }

    // // Deactivate user
    // const DeactivateAccount = async (userId) => {
    //   try {
    //     await axios.put(`http://localhost:8080/auth/deactivate/${userId}`);
    //     dispatch(authActions.deactivateAccount(userId));
    //     dispatch(authActions.setUsersAfterApprove(userId));
    //     navigate('/Home/admin/users');
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    // }
  
//     return (
//       <div className='max-w-full p-32 col-span-5 h-screen'>
        // {pendingUsers?.length === 0 ? (
        //   <div className="mt-32">No User Available</div>
        // ) : (
//           pendingUsers?.map((userData, index) => (
//             <div key={index} className='grid grid-cols-4 grid-rows-1 gap-2'>
//               <div className='col-span-1'>
//                 <img
//                   className="w-full pb-[100px] rounded-md"
//                   src="https://images.unsplash.com/photo-1558203728-00f45181dd84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80"
//                   alt=""
//                 />
//                 <div className='flex items-center justify-center pt-2 italic'>{userData?.role}</div>
//               </div>
//               <div className='col-span-3 pl-5'>
//                 <div className='top'>
//                   <div className='text-2xl font-bold'>{userData?.fullName}</div>
//                   <div className='pl-5 italic'>{userData?.role}</div>
//                 </div>
//                 <div className='pt-5 flex items-center gap-2'>
//                   <div>
//                     <div>{userData?.faculty}</div>
//                     <div>{userData?.level}</div>
//                   </div>
//                 </div>
//                 <div className='pt-5'>
//                   <div className='pt-3 flex flex-col gap-2'>
//                     <div className='flex gap-6'>
//                       <p>{userData?.email}</p>
//                     </div>
//                     {/* {userData?.accountStatus} */}
                // {userData?.approvalStatus === 'pending' && 
                //     <div>
                //       <button className="bg-blue-500 hover-bg-blue-700 text-white p-2 mt-3 rounded-sm" onClick={ApproveUser}> Approve
                //       </button>
                //       <button className="bg-red-500 ml-3 text-white p-2 mt-3 rounded-sm" onClick={() => handleRejectUser(userData?._id)}> Reject
                //       </button>
                //     </div>
                // }
                // {userData?.accountStatus === 'inactive' && 
                //     <div>
                //       <button className='bg-green-500 p-1 text-white rounded-sm text-xs' onClick={()=> ActivateAccount(userData?._id)}>Activate</button>
                //     </div>
                // }
                // {userData?.accountStatus === 'active' && 
                //     <div>
                //         <button className='bg-red-500 p-1 text-white rounded-sm text-xs' onClick={() => DeactivateAccount(userData._id)}>Deactivate</button>
                //     </div>
                // }
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
  
        // {showSuccessPopup && !approvalConfirmed && (
        //   <div>
        //     <div className="success-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
        //     <div className="success-popup w-[500px] h-[200px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg text-center z-50 w-500 h-200">
        //       <span className="close-popup absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer" onClick={handleCancelApproval}>
        //         &times;
        //       </span>
        //       <h2 className="text-2xl font-semibold mb-4">Approval Confirmation</h2>
        //       <p className="text-gray-600">Do you want to approve this user?</p>
        //       <div className="flex justify-center mt-6">
        //         <button
        //           className="bg-blue-500 hover-bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
        //           onClick={handleConfirmApproval}
        //         >
        //           Confirm
        //         </button>
        //         <button
        //           className="bg-red-500 hover-bg-red-700 text-white py-2 px-4 rounded-md"
        //           onClick={handleCancelApproval}
        //         >
        //           Cancel
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // )}
//       </div>
//     );
//   }
  
//   export default UserListDetails;
  
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { authActions } from "../../../redux/auth/authSlice";
import { useNavigate, useParams } from 'react-router-dom';


const UserDetailsPage = () => {
  const navigate = useNavigate()
  const userId = useParams();
  const id = userId.userId;
  const dispatch = useDispatch();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [approvalConfirmed, setApprovalConfirmed] = useState(false);

  const users = useSelector((state) => state.auth.users);
  const pendingUsers = users.filter((user) => user._id === id);

  const ApproveUser = () => {
    // Show the success pop-up
    setShowSuccessPopup(true);
  }

  const handleConfirmApproval = async () => {
    try {
      await axios.put(`http://localhost:8080/auth/approve/${id}`);
      dispatch(authActions.approveAccount(id));
      navigate('/Home/admin/users');
    } catch (error) {
      console.error('Error:', error);
    }

    // Close the success pop-up
    setShowSuccessPopup(false);
    setApprovalConfirmed(true);
  }

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
          <div>
            <div className="success-overlay fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
            <div className="success-popup w-[500px] h-[200px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg text-center z-50 w-500 h-200">
              <span className="close-popup absolute top-2 right-2 text-gray-500 text-2xl cursor-pointer" onClick={handleCancelApproval}>
                &times;
              </span>
              <h2 className="text-2xl font-semibold mb-4">Approval Confirmation</h2>
              <select>
                <option className='min-w-[100%] px-16 py-2' value="">Select Position</option>
                <option value="">Admin</option>
                <option value="">Ci</option>
                <option value="">Cmdt</option>
                <option value="">Io</option>
                <option value="">Rogistic</option>
                <option value="">Academia</option>
              </select>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-500 hover-bg-blue-700 text-white py-2 px-4 rounded-md mr-2"
                  onClick={handleConfirmApproval}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-500 hover-bg-red-700 text-white py-2 px-4 rounded-md"
                  onClick={handleCancelApproval}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default UserDetailsPage;





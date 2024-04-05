import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

function PendingUsers() {
  const allUsers = useSelector((state) => state.auth.users);
  const [approvalStatusFilter, setApprovalStatusFilter] = useState('all'); // Default filter is 'all'
  const [userTypeFilter, setUserTypeFilter] = useState('all'); // Default filter is 'all'
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on the selected filters
  const filteredUsers = allUsers.filter((user) => {
    const isApprovalStatusMatch =
      approvalStatusFilter === 'all' || user.approvalStatus === approvalStatusFilter;

    const isUserTypeMatch =
      userTypeFilter === 'all' ||
      (userTypeFilter === 'Student' && user.role === 'Student') ||
      (userTypeFilter === 'Staff' && user.role === 'Staff');

    const isSearchMatch =
      !searchQuery ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase());

    return isApprovalStatusMatch && isUserTypeMatch && isSearchMatch;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Get current users based on pagination and filters
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  return (
    <>
      <div className="pb-10">
        <p className="text-blue-500 text-2xl">Users List</p>
      </div>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <select
            value={approvalStatusFilter}
            onChange={(e) => setApprovalStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All</option>
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="px-4 py-2 border rounded-md ml-4"
        />
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left font-semibold text-sm">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left font-semibold text-sm">
              Role
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left font-semibold text-sm">
              Date Joined
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left font-semibold text-sm">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link to={`/Home/admin/manage-users/${user._id}`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixdivb=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900">{user?.fullName}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link to={`/Home/admin/manage-users/${user._id}`}>
                  <p className="text-gray-900">{user?.role}</p>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link to={`/Home/admin/manage-users/${user._id}`}>
                  <p className="text-gray-900">
                    {new Date(user?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link to={`/Home/admin/manage-users/${user._id}`}>
                  <span className="relative inline-block px-3 py-1 font-semibold text-red-500 leading-tight">
                    <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">{user?.approvalStatus}</span>
                  </span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Include Pagination component */}
      <Pagination itemsPerPage={itemsPerPage} totalItems={filteredUsers.length} paginate={paginate} />
    </>
  );
}

export default PendingUsers;

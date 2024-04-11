import React, { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { issueActions } from '../../redux/issue/issueSlice';
import axios from 'axios';

function IssuePageMenuAllIssues() {
  const dispatch = useDispatch();
  const studentIssues = useSelector((state) => state.issue.issues);
  const [reporterId, setUserId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;

  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));

    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
    } else {
      //
    }
  }, []);

  useEffect(() => {
    if (reporterId) {
      const fetchStudentIssues = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/issue/reporter/${reporterId}`);
          const studentIssues = response.data;
          dispatch(issueActions.getStudentIssue(studentIssues));
        } catch (error) {
          console.log(error);
        }
      };

      fetchStudentIssues();
    }
  }, [dispatch, reporterId]);

  const filteredIssues = studentIssues.filter((issue) => {
    if (filter !== 'all' && issue.status !== filter) {
      return false;
    }
    if (selectedMonth !== 'all') {
      const issueDate = new Date(issue.createdAt);
      const issueMonth = issueDate.getMonth().toString();
      if (issueMonth !== selectedMonth) {
        return false;
      }
    }
    if (selectedYear !== 'all') {
      const issueDate = new Date(issue.createdAt);
      const issueYear = issueDate.getFullYear().toString();
      if (issueYear !== selectedYear) {
        return false;
      }
    }
    return true;
  });

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredIssues.length / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/issue/delete/${id}`);
      dispatch(issueActions.deleteIssue(id));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <select
          id="filterOption"
          name="filterOption"
          className="border p-2 rounded-md w-96"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="assigned">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <select
          id="monthOption"
          name="monthOption"
          className="border p-2 rounded-md w-96"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="all">All Months</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        <select
          id="yearOption"
          name="yearOption"
          className="border p-2 rounded-md w-96"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All Years</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          {/* Add more years as needed */}
        </select>
      </div>

      {currentIssues && currentIssues.length > 0 ? (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentIssues.map((issue, index) => (
                <tr key={issue._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <Link to={`/Home/manage-issue/${issue._id}`}>
                      <div className="flex gap-2">
                        <div className="text-green-500 text-4xl">
                          <BsDot />
                        </div>
                        <div onClick={() => dispatch(issueActions.setAssignedTo(issue.assignedTo))}>
                          <p className="pb-2">{issue.title}</p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{issue.category}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{issue.status}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link to={`/Home/update-issue/${issue._id}`}>
                        <button className="px-4 py-2 text-blue-500 cursor-pointer rounded-md">Edit</button>
                      </Link>
                      <Link to="#" onClick={() => handleDelete(issue._id)}>
                        <button className="px-4 py-2 text-red-500 cursor-pointer rounded-md">Delete</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <nav>
              <ul className="pagination flex space-x-2">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <button
                      onClick={() => handlePageClick(number)}
                      className={`${
                        currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-blue-300'
                      } px-3 py-1 border rounded-md`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <p>No current issues found :)</p>
      )}
    </div>
  );
}

export default IssuePageMenuAllIssues;

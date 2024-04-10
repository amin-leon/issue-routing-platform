import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MeetingAndEscalate from './issueEscalationAndMeeting/ShareAndEscalateIssue';

function AllIssues() {
  const MyIssues_Staff = useSelector((state) => state.issue.assignedToMe);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;


  const handleIconClick = (issueId) => {
    setSelectedIssueId(issueId);
  };

  const handleClosePopUp = () => {
    setSelectedIssueId(null);
  };

  const filteredIssues = filter === 'all' ? MyIssues_Staff : MyIssues_Staff.filter((issue) => {
    return issue.status === filter;
  });
  

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(MyIssues_Staff.length / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <select
          className="border p-2 rounded-md w-64"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="new">Pending</option>
          <option value="assigned">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {currentIssues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Priority</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentIssues.map((issue, index) => (
                <tr
                  key={issue._id}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <Link to={`/Home/manage-issue/${issue._id}`} key={Date.now()}>
                      <div className="flex gap-1">
                        <div>
                          <p className="pb-2">{issue.title}</p>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-6 text-left  whitespace-nowrap">
                    {issue.status}
                  </td>
                  <td className="py-3 px-6 text-left text-red-500 whitespace-nowrap font-extrabold">
                    {issue.priority}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {issue.status ==="closed" && (
                        <button
                            onClick={() => handleIconClick(issue._id)}
                            className="cursor-pointer text-blue-500 text-sx font-semibold"
                          >
                           Solved
                        </button>
                      )}
                      {issue.status !=="closed" && (
                        <button
                            onClick={() => handleIconClick(issue._id)}
                            className="cursor-pointer text-[#1F3365] text-sx font-semibold"
                          >
                           Escalate
                        </button>
                      )}
                      {selectedIssueId === issue._id && (
                        <MeetingAndEscalate
                          onClose={handleClosePopUp}
                          issueId={selectedIssueId}
                        />
                      )}
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
                  <li key={Date.now()} className="page-item">
                    <button
                      onClick={() => handlePageClick(number)}
                      className={`${
                        currentPage === number ? 'bg-[#1F3365] text-white' : 'hover:bg-blue-300'
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
      )}
    </div>
  );
}

export default AllIssues;

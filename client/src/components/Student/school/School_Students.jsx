import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const School_Students = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/school/student/all');
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const handleDelete = async(studentId) => {
    try {
      const deleteStudent = await axios.delete(`http://localhost:8080/api/school/student/delete/${studentId}`);
      if(deleteStudent){
        window.location.href= 'http://localhost:3000/Home/school'
      }
    } catch (error) {
      
    }
    console.log(`Delete clicked for student ID: ${studentId}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <div className="container mx-auto mt-8 px-16 border w-[90%] py-8 h-[90%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="px-4 py-2 border rounded-md"
          />
          <Link to="new">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Add New
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-300 text-gray-700 text-sm leading-normal">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Grade</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.map((student, index) => (
              <tr
                key={student.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-200`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{student.email}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{student.name}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{student.age}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">{student.grade}</td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <Link to={`edit/${student._id}`}>
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <nav>
          <ul className="pagination flex space-x-2">
            {[...Array(Math.ceil(filteredStudents.length / itemsPerPage)).keys()].map((number) => (
              <li key={number + 1} className="page-item">
                <button
                  onClick={() => paginate(number + 1)}
                  className={`${
                    currentPage === number + 1 ? "bg-blue-500 text-white" : "hover:bg-blue-300"
                  } px-3 py-1 border rounded-md`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default School_Students;

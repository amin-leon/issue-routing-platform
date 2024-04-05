import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const EditStudentInfo = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    telephone: "",
    email: "",
    faculty: "",
    level: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const editStudent = await axios.put(`http://localhost:8080/api/school/student/update/${id}`, formData);
      if(editStudent){
        setLoading(false)
        setError("Student successfully Updated")
        setFormData('')
      }
    } catch (error) {
      console.log(error);
      setError("Student No Updated :)")
    }
  };

  // Populate data with edit form 
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/school/student/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFormData({
          name: data.name || "",
          surname: data.surname || "",
          age: data.age || "",
          telephone: data.telephone || "",
          email: data.email || "",
          faculty: data.faculty || "",
          level: data.level || "",
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudentData();

  }, [id]);


  return (
    <div className="container mx-auto mt-8 px-4 py-2">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Student Info</h2>
      <form onSubmit={handleSubmit} className="border p-24 grid grid-cols-2 gap-4">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="surname"
            placeholder="Enter surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="age"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="telephone"
            placeholder="Enter telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <select
            id="faculty"
            name="faculty"
            placeholder="Select faculty"
            value={formData.faculty}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          >
            <option value="CSC">Computer Science</option>
            <option value="LANG">Modern Lanuages</option>
            <option value="PPS">Police Prof. Studies</option>
            <option value="LAW">Law</option>
          </select>
        </div>

        <div className="mb-4">
          <select
            id="level"
            name="level"
            placeholder="Select level"
            value={formData.level}
            onChange={handleChange}
            className="mt-1 p-3 bg-gray-100 border-none rounded-md w-full"
          >
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4">Level 4</option>
          </select>
        </div>


        <div className="mt-4 col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Update
          </button>
          <p className="text-green-500">{error ? error: ""}</p>
        </div>
      </form>
    </div>
  );
};

export default EditStudentInfo;

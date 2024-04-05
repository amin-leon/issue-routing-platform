import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios for making HTTP requests

function SharedDocs() {
  const issueDetails = useSelector((state) => state.issue.studentIssues);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!file) {
        console.error('No file selected.');
        return;
      }

      const formData = new FormData();
      formData.append('attachment', file);

      const response = await axios.post(`http://localhost:8080/issue/add-attachment/${issueDetails.issue._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('File uploaded:', response.data.issue);
      // Clear the file input after upload
      setFile(null);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Shared Docs Between staff and student</h1>

      {/* File Upload Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Upload Attachment:
        </label>
        <input type="file" onChange={handleFileChange} className="mt-1" /><br></br>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {issueDetails?.issue.attachments.map((issue) => (
          <div key={issue._id} className="bg-white rounded shadow-md p-4">
            <div className="w-full h-auto mb-2" />
            {issue.filename}
            <a href={`http://localhost:8080${issue.url}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500">View Attachment</a> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedDocs;

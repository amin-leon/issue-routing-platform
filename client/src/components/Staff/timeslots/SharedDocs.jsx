import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addDocument, deleteDocument } from '../../../redux/docs/docsSlice'; 
import { useParams } from 'react-router-dom';


function SharedDocs() {
  const documents = useSelector((state) => state.documents.documents);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { issueId } = useParams();




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
      formData.append('document', file);
      formData.append('issueId', issueId)
      formData.append('posterUser', issueId)

      // Assuming you have an endpoint for uploading documents
      const response = await axios.post('http://localhost:8080/docs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Dispatch the addDocument action with the new document
      dispatch(addDocument(response.data.newDoc));
      console.log('File uploaded:', response.data.newDoc);
      // Clear the file input after upload
      setFile(null);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const handleDelete = async (documentId) => {
    try {
      // Assuming you have an endpoint for deleting documents
      await axios.delete(`http://localhost:8080/docs/documents/delete/${documentId}`);
      // Dispatch the deleteDocument action with the documentId to delete it from the Redux store
      dispatch(deleteDocument(documentId));
      alert('Document deleted');
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };


  console.log("Hellloooooooooooooooooooooooooooooooooo", documents)

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Documents Shared</h1>

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
      {/* Document List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((document) => (
          <div key={document._id} className="bg-white rounded shadow-md p-4">
            <div className="w-full h-auto mb-2" />
            {document.document}
            <a href={`http://localhost:8080/${document.document}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500">Read document</a> 
            
            <button onClick={() => handleDelete(document._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedDocs;


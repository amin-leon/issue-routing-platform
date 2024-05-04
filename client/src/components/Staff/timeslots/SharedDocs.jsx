// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { issueActions } from '../../../redux/issue/issueSlice';

// function SharedDocs() {
//   const issueDetails = useSelector((state) => state.issue.studentIssues);
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       if (!file) {
//         console.error('No file selected.');
//         return;
//       }

//       const formData = new FormData();
//       formData.append('attachment', file);

//       const response = await axios.post(`http://localhost:8080/issue/add-attachment/${issueDetails.issue._id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('File uploaded:', response.data.issue);
//       // Clear the file input after upload
//       setFile(null);
//     } catch (error) {
//       console.log('Error uploading file:', error);
//     }
//   };

//   const handleDelete = async (attachmentId) => {
//     try {
//       await axios.delete(`http://localhost:8080/issue/attachments/${issueDetails.issue._id}/${attachmentId}`);
//       dispatch(issueActions.deleteAttachment(attachmentId));
//       alert('Attachment deleted deleted');
//     } catch (error) {
//       console.log('Error deleting attachment:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8 px-4">
//       <h1 className="text-2xl font-bold mb-4">Documents Shared</h1>

//       {/* File Upload Form */}
//       <form onSubmit={handleSubmit} className="mb-4">
//         <label className="block mb-2">
//           Upload Attachment:
//         </label>
//         <input type="file" onChange={handleFileChange} className="mt-1" /><br></br>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//           Upload
//         </button>
//       </form> 
//       {/* sm:grid-cols-2 */}

//       <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
//         {issueDetails?.issue.attachments.map((attachment) => (
//           <div key={attachment._id} className="bg-white rounded shadow-md p-4">
//             <div className="w-full h-auto mb-2" />
//             {attachment.filename}
//             <a href={`http://localhost:8080${attachment.url}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500">View Attachment</a> 
            
//             <button onClick={() => handleDelete(attachment._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SharedDocs;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addDocument, deleteDocument } from '../../../redux/docs/docsSlice'; 

function SharedDocs() {
  const documents = useSelector((state) => state.documents.documents);
  const dispatch = useDispatch();
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
      await axios.delete(`your-delete-endpoint/${documentId}`);
      // Dispatch the deleteDocument action with the documentId to delete it from the Redux store
      dispatch(deleteDocument(documentId));
      alert('Document deleted');
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  console.log("Helloooooooooooooooooooooooooooooooooo", documents);

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
            {document.filename}
            <a href={`http://localhost:8080${document.url}`} target="_blank" rel="noopener noreferrer" className="block text-blue-500">View Attachment</a> 
            
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


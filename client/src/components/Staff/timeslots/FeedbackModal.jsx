import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackModal = ({ feedback, onClose }) => {
    
    const staff = 'Staff';
    const [assignedTo, setSelectedStaff] = useState('');
    const [allStaffs, setAllStaffs] = useState([]);

    useEffect(() => {
        const fetchIssuesData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/staffs/${staff}`);
                setAllStaffs(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIssuesData();
    }, []);

    const handleAssignTo = async () => {
        try {
            if (feedback?.issueId && assignedTo) { // Check if feedback.issueId is defined
                const response = await axios.put(`http://localhost:8080/feedback/assign/${feedback.issueId}/${assignedTo}`);
                console.log("Assigned to:", response);
            } else {
                console.log('Invalid feedback or assignedTo value', feedback);
            }
        } catch (error) {
            console.log('Error assigning to staff:', error);
        }
    };
    

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
            <div className="bg-white rounded-md shadow-lg" style={{ width: '50%', height: '50%' }}>
                <div className="p-8 h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{feedback?.issueTitle}</h2>
                        <p className="text-gray-600 mb-4">{feedback?.feedbackText}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={feedback?.reporterImage}
                                    alt="reporter_image"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <span className="text-gray-700">{feedback?.reporterName}</span>
                            </div>
                            <span className="text-gray-500">Higher: {feedback?.wantToGoHigher ? "Yes" : "No"}</span>
                        </div>
                    </div>
                    {feedback?.wantToGoHigher && (
                        <select
                            id="staffSelect"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={assignedTo}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                            <option value="">Select staff</option>
                            {allStaffs.map((s) => <option key={s._id} value={s._id}>{s.position}</option>)}
                        </select>
                    )}
                    <div>
                        <button className="mt-4 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600" onClick={onClose}>Close</button>
                        {feedback?.wantToGoHigher && (
                            <button className="mt-4 text-white bg-blue-500 px-4 py-2 rounded hover:bg-black" onClick={handleAssignTo}>Assign To</button>
                        )}
                        <button className="mt-2 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackModal from './FeedbackModal';

const FeedbackComponent = () => {
  const [userId, setUserId] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
    } else {
      console.log('Failed to fetch userID');
    }
  }, []);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        if (!userId) return;
        const response = await axios.get(`http://localhost:8080/feedback/${userId}`);
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, [userId]);

  const openModal = async (feedback) => {
    setSelectedFeedback(feedback);
    await updateIsRead(feedback);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
  };

  const updateIsRead = async (feedback) => { // Pass feedback as argument
    try {
      await axios.put(`http://localhost:8080/feedback/read/${feedback._id}`);
    } catch (error) {
      console.error('Error updating isRead:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      {feedbackData && feedbackData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackData.map((feedback) => (
            <div key={feedback._id} className={`bg-white rounded-md shadow-md p-6 cursor-pointer ${feedback.isRead ? '' : 'border border-red-500'}`} onClick={() => openModal(feedback)}>
              <h2 className="text-xl font-semibold mb-2">{feedback.issueTitle}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={feedback.reporterImage}
                    alt="reporter_image"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-700">{feedback.reporterName}</span>
                </div>
                <span className="text-gray-500">{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No feedback found</div>
      )}
      {selectedFeedback && <FeedbackModal feedback={selectedFeedback} onClose={closeModal} />}
    </div>
  );
};

export default FeedbackComponent;

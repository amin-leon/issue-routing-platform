import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { issueActions } from '../../../redux/issue/issueSlice';
import { BsSend } from 'react-icons/bs';

function MyTimeSlots() {
  const { issueId , reporterId} = useParams();
  const dispatch = useDispatch();
  const issueDetails = useSelector((state) => state.issue.studentIssues);
  const StaffStudentComments = useSelector((comments) => comments.issue.StudentStaffComment);

  // State for the comment form
  const [reporter, setReporter] = useState([]);
  const [commentText, setComment] = useState('');
  const [authorId, setUserId] = useState('');
  const [closerInfo, setCloserInfo] = useState('');
  // const [file, setFile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newStep, setNewStep] = useState('');
  const [steps, setSteps] = useState([]);
  const [feedbackText, setFeedbackText]= useState('')

  const [feedback, setFeedback] = useState({
    text: feedbackText,
    author: authorId,
    steps: [], 
    attachment: null
  });


  useEffect(() => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      text: feedbackText,
      author: authorId,
      steps: steps,
      // attachment: file
    }));
  }, [feedbackText, authorId, steps]);

  
  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/issue/view/${issueId}`);
        const issueData = response.data;
        dispatch(issueActions.getIssueDetails(issueData));
        // reporter name
        const reporterInfo = await axios.get(`http://localhost:8080/auth/${issueData.issue.reporter}`);
        setReporter(reporterInfo.data);
      } catch (error) {
        console.log('Error fetching issue details:', error);
      }
    };

    fetchIssueDetails();
  }, [dispatch, issueId]);

  useEffect(() => {
    const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
    if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
      setUserId(storedUserInfo.user._id);
      setCloserInfo(storedUserInfo.user);
    } else {
      console.log('Failed to fetch userID');
    }
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      text: commentText,
      authorId: authorId,
    };

    try {
      if (commentText && authorId) {
        const response = await axios.post(`http://localhost:8080/issue/staff-student-chat/${issueId}/comments`, commentData);
        const newComment = response.data;
        dispatch(issueActions.addStaffStudentComment(newComment));
        setComment('');
      } else {
        console.log('commentText and userId are required to create a comment');
      }
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/issue/staff-student-chat/${issueId}/comments`);
        const commentData = response.data;
        await axios.put(`http://localhost:8080/issue/mark-as-read/${issueId}`);

        // Fetch user information for each comment
        const commentsWithUserInfo = await Promise.all(
          commentData.map(async (comment) => {
            const userInfoResponse = await axios.get(`http://localhost:8080/auth/${comment.author}`);
            const userInfo = userInfoResponse.data;

            return {
              ...comment,
              userInfo,
            };
          })
        );

        dispatch(issueActions.setStaffStudentComment(commentsWithUserInfo));
      } catch (error) {
        console.log('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [dispatch, issueId]);


  const handleCloseIssue = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/issue/close/${issueId}/${reporterId}`, feedback);
      dispatch(issueActions.setIssueToClose(response.data));
      window.location.href = '/Home/staff-issue-page';
    } catch (error) {
      console.log('Error closing issue:', error);
    }
  };
  
  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleAddStep = () => {
    if (newStep.trim() !== '') {
      setSteps([...steps, newStep]);
      setNewStep('');
    }
  };


  return (
    <div>
        <div className="md:w-[50%] md:p-5">
          <p className="text-2xl font-bold pb-3">{issueDetails?.issue?.category} issue</p>
          <p className='text-xs'>"{issueDetails?.issue?.description}"</p>
        </div>
        <div className="md:p-10 border">
          <p className='pb-5'>({StaffStudentComments.length})Comments</p>
          {Array.isArray(StaffStudentComments) && StaffStudentComments.map((comment) => (
            <div className="flex gap-2 md:p-2" key={comment._id}>
              <img
                className="w-8 h-8 rounded-full"
                src={`http://localhost:8080/${comment?.userInfo?.profile}`}
                alt="No_Pic"
              />
              <div>
                <p className="font-bold">
                  {comment?.userInfo?.fullName}
                  <span className="text-gray-300 text-xs pl-10">
                    {comment.createdAt}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{comment.text}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-2 p-2">
            <div className='mt-3'>
              <form onSubmit={handleCommentSubmit}>
                <div>
                  <textarea
                  id="chat_message"
                    cols={120}
                    rows={7}
                    required
                    onChange={(e) => setComment(e.target.value)}
                    value={commentText}
                    className="w-full  rounded-md focus:outline-none p-3 bg-transparent"
                    placeholder="Type your comment ...."
                  ></textarea>
                </div> 
                <div>
                  <input type="text" value={authorId} hidden readOnly />
                </div>
                <div className="p-3 text-red-500 font-bold">
                   {issueDetails?.issue.status === 'closed' ? 'Closed' : ( 
                      <button
                        type="submit"
                        className="bg-[#1F3365] hover.bg-blue-700 text-white py-1 px-3 sm rounded-md focus-border-transparent focus-outline-none focus-shadow-outline-none"
                      >
                     <BsSend />
                    </button>
                 )} 
                </div>
              </form>
              {closerInfo?.role === 'Staff' && (
                <div className='flex gap-3 items-center'>
                   {!issueDetails?.issue.status && (
                      <button className='bg-[#1F3365] text-white p-2 rounded-sm focus:border-none' onClick={openForm} >Close issue</button>
                   )}
                </div>
              )}
              {isFormOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white w-full p-8 rounded-md md:w-[45%]">
                    <label htmlFor="form">Close issue with feedback</label>
                    <form className="flex flex-col space-y-4">
                      <textarea
                        placeholder='Type feedback....'
                        onChange={(e) => setFeedbackText( e.target.value)}
                        value={feedbackText}
                        className="w-full p-2 border rounded-md"
                        rows={6}
                      />
                      <div>
                        <p className="font-bold">Steps to Follow:</p>
                        <ol className="list-decimal pl-4">
                          {steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Add new step..."
                            value={newStep}
                            onChange={(e) => setNewStep(e.target.value)}
                            className="border p-2 rounded-md flex-grow"
                          />
                          <button
                            type="button"
                            onClick={handleAddStep}
                            className="bg-[#1F3365] text-white p-2 rounded-md hover:bg-blue-700"
                          >
                            Add Step
                          </button>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-[#1F3365] text-white p-2 rounded-md hover:bg-blue-700"
                        onClick={handleCloseIssue}
                      >
                        Submit
                      </button>
                    </form>
                    <button
                      onClick={closeForm}
                      className="mt-4 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
                    >
                      Close Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

export default MyTimeSlots;

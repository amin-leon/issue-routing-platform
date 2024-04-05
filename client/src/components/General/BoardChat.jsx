import { AiFillCheckSquare} from 'react-icons/ai'
import { BsSend } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { issueActions } from '../../redux/issue/issueSlice';
import { useNavigate } from 'react-router-dom';


function BoardChat() {
  const {issueId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const groupComments = useSelector((comments)=> comments.issue.groupComment)

const [commentText, setCommentText] = useState('');
const allIssues = useSelector((state)=> state.issue.chatRoomIssue)
const currentIssue = allIssues.filter((issue)=> issue._id === issueId)

// filter report
const allusers = useSelector((state)=> state.issue.IssueReporter);
const singleReport = allusers.filter((user)=> user._id === currentIssue[0]?.reporter);

// Current user
const [userInfo, setUserId] = useState('')
useEffect(() => {
  const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
  
  if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
    setUserId(storedUserInfo.user);
  } else {
      //
  }
}, []);


useEffect(() => {
  const fetchCommentsData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/issue/chatroom/${issueId}/comments`);
      if (response.status === 200) {
        const fetchedComments = response.data;

        const authorInfoPromises = fetchedComments.map(async (comment) => {
          const authorInfoResponse = await axios.get(`http://localhost:8080/auth/${comment.author}`);
          const authorInfo = authorInfoResponse.data;

          return {
            ...comment,
            authorInfo,
          };
        });

        const commentsWithUserInfo = await Promise.all(authorInfoPromises);
        dispatch(issueActions.setGroupComment(commentsWithUserInfo));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  fetchCommentsData();
}, [dispatch, issueId]);


// save data
const handleCommentSubmit = async (e) => {
  e.preventDefault();

  const commentData = {
    text: commentText,
    authorId: userInfo._id,
  };

  try {
    const response = await axios.post(`http://localhost:8080/issue/chatroom/${issueId}/comments`, commentData);
    if (response.status === 201) {
      console.log('Comment posted successfully');
      const newComment = response.data;

      dispatch(issueActions.addGroupComment(newComment));
      setCommentText('');
    } else {
      console.error('Failed to post comment');
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

// RemoveIssuefromGroup
const RemoveIssuefromGroup = async(e)=>{
  const issueId = currentIssue[0]._id;
    e.preventDefault()
    await axios.put(`http://localhost:8080/issue/remove/${issueId}`)
    .then(()=>{
      navigate('/Home/board-issues')
    })
    .catch(error =>{
      console.log(error)
    })

}


  return (
    <div className="grid grid-cols-3 gap-4 pl-32 pt-10">

      <div className="col-span-1">
        <div className="p-4 border flex gap-3 mb-5">
          <img className='w-20 h-20 rounded-md' src={`http://localhost:8080/${singleReport[0]?.profile}`}  alt="" />
          <div>
            <p className='text-xl font-bold'>{singleReport[0]?.fullName}</p>
            <p className='text-xs text-gray-500'>{singleReport[0]?.role}</p>
            <button className='text-white bg-blue-500 rounded-md p-1 pl-2 pr-2 mt-5 hover:bg-black'>More info</button>
          </div>
        </div>
        <div className="p-4 border">
          <p className='pb-3'>Staff commented:</p>
          <div className=' flex pl-5'>
            <img className='w-10 h-10 rounded-full' src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?auto=format&fit=crop&q=80&w=1641&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="border p-5">
          <p className="text-2xl font-bold pb-3">{currentIssue[0]?.title}</p>
          <p className='text-xs'>{currentIssue[0]?.description}</p>
        </div>
        <div className="p-4 border">
          <p className='pb-5'>({groupComments.length})Comments</p>

          {groupComments.map((comment, index) => (
          <div className="flex gap-2 p-2 pb-5" key={Date.now()+ Math.floor(Math.random() * 1000000)} >
            <img
              className="w-8 h-8 rounded-full"
              src={`http://localhost:8080/${comment?.authorInfo?.profile}`} 
              alt=""
            />
            <div>
              <p className="font-bold">{comment?.authorInfo?.fullName}<span className="text-gray-300 text-xs pl-10">{comment.createdAt}</span></p>
              <p className="text-xs text-gray-500">{comment.text}</p>
            </div>
          </div>
          ))}
          <div>

    </div>

          <div className="flex gap-2 p-2">
            <div className='mt-3'>
            <form onSubmit={handleCommentSubmit}>
                <div>
                  <textarea
                    required
                    name="comments"
                    className="w-full  rounded-md focus:outline-none p-3 bg-transparent"
                    placeholder="Type your comment ...."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  ></textarea>
                </div>

                <div className="p-3">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 sm rounded-md focus:border-transparent focus:outline-none focus:shadow-outline-none"
                  >
                    <BsSend />
                  </button>
                </div>
              </form>
              {currentIssue[0]?.assignedTo === userInfo?._id &&
            <div className='flex gap-3 items-center cursor-pointer' onClick={RemoveIssuefromGroup}>
               <AiFillCheckSquare className='bg-blue-500 text-white mt-3 cursor-pointer'/>
              <p>want to close issue?</p>
            </div>
            }
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default BoardChat;

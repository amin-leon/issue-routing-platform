import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { issueActions } from "../../redux/issue/issueSlice";
import { useDispatch } from "react-redux";
import {GoCommentDiscussion } from 'react-icons/go'


function BoardIssuesTOChatOn() {
    // const groupComments = useSelector((comments)=> comments.issue.groupComment)
    const dispatch = useDispatch()
    const [chatroomIssues, setChatroomIssues] = useState([]);

    useEffect(() => {
      const fetchChatroomIssues = async () => {
        const response = await axios.get('http://localhost:8080/issue/chatroom-issues');
        const chatroomIssues = response.data;
        dispatch(issueActions.setChatRoomIssue(chatroomIssues));
        setChatroomIssues(chatroomIssues);

        // reporter info
        const reporterInfo = await axios.get(`http://localhost:8080/auth/users`);
        dispatch(issueActions.setIssueReporter(reporterInfo.data));
      };
  
      fetchChatroomIssues();
    }, [dispatch]);

  
  return (
    <div className='flex justify-center pt-10'>
        <div className='h-screen w-[90%] max-auto bg-gray-100 p-5'>
        <div className='p-10'>
            <p className='text-2xl'>Staffs Chat Room</p>
            <p className="text-sm pl-4"> Click on card to share your point of view</p>
        </div>
        <hr />
        <div className="h-auto w-[80%] grid grid-cols-3 gap-3">
        {chatroomIssues.map((chatroomIssue) => (
        <Link to={`/Home/staff-chatboard/${chatroomIssue._id}`} key={Date.now()}>
            <div className="col-span-1 flex flex-col bg-white rounded-md mt-5">
                <div className="flex justify-between p-7 gap-5">
                    <div className="flex gap-2">
                        <div className="rounded-full bg-blue-400 text-white w-10 h-10 text-xl flex items-center justify-center">G</div>
                        <div className="">{chatroomIssue.title}</div>
                    </div>
                    <div className="text-red-500 rounded-sm">{chatroomIssue.inDiscusion}</div>
                </div>
                <div className="flex flex-col pl-7">
                <p className="text-gray-400 text-xs">{chatroomIssue.updatedAt}</p>
                    <div className="flex items-center gap-1">
                       <p>{chatroomIssue.groupComments.length}</p>
                       <GoCommentDiscussion className="text-blue-500" />
                    </div>
                </div>
            </div>
        </Link>
            ))}
            
        </div>
        </div>
    </div>
  )
}

export default BoardIssuesTOChatOn
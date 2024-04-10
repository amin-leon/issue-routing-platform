import { useDispatch, useSelector, } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { issueActions } from '../../redux/issue/issueSlice';
import { Link } from 'react-router-dom';
import { Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
 } from 'chart.js';

 import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const StaffHomePage = () => {

const dispatch = useDispatch();
const newIssues = useSelector((state) => state.issue.issues);
const progressIssues = useSelector((state) => state.issue.progressIssues);
const closedIssues = useSelector((state) => state.issue.closedIssues);
const All_Issues = useSelector((state) => state.issue.assignedToMe);
const len = All_Issues.length;
const Issues = len > 0 ? All_Issues.slice(len - 4, len) : [];


//Three lengths
const newLeng = newIssues.length
const progLeng = progressIssues.length
const closeLeng = closedIssues.length


const [assignedToId, setUserId] = useState(null);


// issues 

useEffect(() => {
  const storedUserInfo = JSON.parse(sessionStorage.getItem('authState'));
  
  if (storedUserInfo && storedUserInfo.user && storedUserInfo.user._id) {
    setUserId(storedUserInfo.user._id);
  } else {
      //
  }
}, []);


useEffect(() => {
  if (assignedToId) {
    const fetchStudentIssues = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/issue/assigned-staff/${assignedToId}`);
        dispatch(issueActions.setAssignedToMe(response.data));

      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentIssues();
  }
}, [dispatch, assignedToId]);

const data = {
  labels: ['New', "Assigned", "Closed"],
  datasets: [
    {
        label: 'Status of Issues',
        data: [newIssues.length, progressIssues.length, closedIssues.length],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)', // New
            'rgba(255, 206, 86, 0.2)', // Progress
            'rgba(75, 192, 192, 0.2)', // Closed
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)', // New
            'rgba(255, 206, 86, 1)', // Progress
            'rgba(75, 192, 192, 1)', // Closed
        ],
        borderWidth: 1,
    },
],
}

const options = {
 //
}

  return (
    <div>
      <div className="issue-container px-32 py-16 grid grid-cols-2 gap-6">
        <div className="cards-graph">
          <div className="cards grid grid-cols-3 gap-3">
          <Link to="/Home/staff-issue-page">
            <div className="card-1 cursor-pointer text-white bg-[#1F3365] px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
              <p className='text-2xl'>Total</p>
              <h1 className='text-2xl'>{len}</h1>
            </div>
            </Link>
            <Link to="/Home/staff-issue-page">
            <div className="card-1 cursor-pointer text-white bg-[#1F3365] px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
              <p className='text-2xl'>Progress</p>
              <h1 className='text-2xl'>{progLeng}</h1>
            </div>
            </Link>
            <Link to="/Home/staff-issue-page">
            <div className="card-1 text-white cursor-pointer bg-[#1F3365] px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
              <p className='text-2xl'>Closed</p>
              <h1 className='text-2xl'>{closeLeng}</h1>
            </div>
            </Link>
          </div>
          <div className="graph py-32">
            <Bar 
              data={data}
              options={options}
            ></Bar>
          </div>
        </div>
      <div className="latest-issue border px-8 py-4">
        <div className="latest-title text-4xl font-bold pb-6">
          <p className=''>Recent issues</p>
        </div>
        <div className="issues-list flex flex-col gap-5 py-4">
        {progressIssues.length > 0 ? (
          progressIssues.map((issue) => (
            <div className="issue-1 border p-4 rounded-md space-y-2" key={Math.random() + Date.now()}>
              <p className="">{issue.title}</p>
                {issue.status === 'assigned' && <p className="px-3 text-red-500">{issue.status}
              </p>}
            </div>
          ))
        ) : (
          <p>No recent issues</p>
        )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default StaffHomePage
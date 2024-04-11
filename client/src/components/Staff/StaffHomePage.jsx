import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

const StaffHomePage = () => {
  const newIssues = useSelector((state) => state.issue.issues);
  const prog = useSelector((state) => state.issue.progressIssues);
  const closedIssues = useSelector((state) => state.issue.closedIssues);
  const All_Issues = useSelector((state) => state.issue.assignedToMe);
  const len = All_Issues.length;
  const progressIssues = len > 0 ? prog.slice(len - 4, len) : [];

  const currentMonth = new Date().getMonth().toString();

  const filteredProgressIssues = prog.filter((issue) => {
    const issueMonth = new Date(issue.createdAt).getMonth().toString();
    return issueMonth === currentMonth;
  });

  const filteredClosedIssues = closedIssues.filter((issue) => {
    const issueMonth = new Date(issue.createdAt).getMonth().toString();
    return issueMonth === currentMonth;
  });

  const data = {
    labels: ['New', 'Assigned', 'Closed'],
    datasets: [
      {
        label: 'Status of Issues',
        data: [newIssues.length, filteredProgressIssues.length, filteredClosedIssues.length],
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
  };

  const options = {};

  return (
    <div>
      <div className="issue-container px-32 py-16 grid grid-cols-2 gap-6">
        <div className="cards-graph">
          <div className="cards grid grid-cols-3 gap-3">
            <Link to="/Home/staff-issue-page">
              <div className="card-1 cursor-pointer text-white bg-[#1F3365] px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl">Total</p>
                <h1 className="text-2xl">{len}</h1>
              </div>
            </Link>
            <Link to="/Home/staff-issue-page">
              <div className="card-1 cursor-pointer text-white bg-[#1F3365] px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl">Progress</p>
                <h1 className="text-2xl">{filteredProgressIssues.length}</h1>
              </div>
            </Link>
            <Link to="/Home/staff-issue-page">
              <div className="card-1 text-white cursor-pointer bg-[#1F3365] px-10 py-10 rounded-md flex flex-col gap-4 justify-center items-center">
                <p className="text-2xl">Closed</p>
                <h1 className="text-2xl">{filteredClosedIssues.length}</h1>
              </div>
            </Link>
          </div>
          <div className="graph py-32">
            <Bar data={data} options={options}></Bar>
          </div>
        </div>
        <div className="latest-issue border px-8 py-4">
          <div className="latest-title text-4xl font-bold pb-6">
            <p className="">Recent issues</p>
          </div>
          <div className="issues-list flex flex-col gap-5 py-4">
            {progressIssues.length > 0 ? (
              progressIssues.map((issue) => (
                <div className="issue-1 border p-4 rounded-md space-y-2" key={Math.random() + Date.now()}>
                  <p className="">{issue.title}</p>
                  {issue.status === 'assigned' && (
                    <p className="px-3 text-red-500">{issue.status}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No recent issues</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHomePage;

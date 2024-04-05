import { BsDot } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function IssuesInProgress() {
  const progressIssues = useSelector((state) => state.issue.progressIssues);

  return (
    <div>
      {progressIssues.length === 0 ? (
        <p>No Statistical chart</p>
      ) : (
        progressIssues.map((issue) => (
          <div className='max-h-60 overflow-y-auto' key={issue._id}>
            <div className='flex flex-row justify-between mb-2 border-b border-b-1'>
              <Link to={`/Home/manage-issue/${issue._id}`}>
                <div className='flex gap-1'>
                  <div className='text-green-500 text-4xl'>
                    <BsDot />
                  </div>
                  <div className='grid grid-row-6'>
                    <div className='col-span-5'>
                      <p className='pb-2'>{issue.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default IssuesInProgress;

import { GrUserSettings } from "react-icons/gr";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { GiConvergenceTarget } from "react-icons/gi";
import { PiStudentLight } from "react-icons/pi";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";



const Sidebar = ({ isSidebarOpen }) => {
  const userInfo = useSelector((state)=> state.auth.user);

  const [link, setLink] = useState(null);

  useEffect(() => {
    if (userInfo && userInfo.role) {
      if (userInfo.role === 'Student') {
        setLink('/Home/issue-page');
      } else if (userInfo.role === 'Admin') {
        setLink('/Home/admin/manage');
      } else {
        setLink('/Home/staff-home');
      }
    }
  }, [userInfo]);
  

  return (
    <div
      className={`bg-white text-black h-screen w-64 border border-r-1${
        isSidebarOpen ? 'block' : 'hidden md:block'
      }`}
    >
      <div className="flex flex-col items-center p-4 ">
        <Link to="#">
        <div className="p-3 border-b border-1">
          <div className='text-black text-4xl font-bold'><img src="https://www.npc.ac.rw/fileadmin/templates/assets/images/NPC_LOGO.png" alt="" className='w-16 h-16'/></div>
        </div>
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-2 justify-center">
        <Link
          to={link}
          className="text-gray-500"
        >
          <div className='p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
            <AiOutlineHome className="text-xl" />Home
          </div>
        </Link>

        {userInfo.role === 'Staff' && (
            <Link to="/Home/board-issues" className="text-gray-500">
                    <div className='p-3 text-black  rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
                      <GiConvergenceTarget className="text-xl" />Chat Room
                    </div>
            </Link>
        )}

        <Link to="/Home/settings" className="text-gray-500">
          <div className='p-3 text-black  rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
            <BsInfoCircle className="text-xl" /> Info
          </div>
          
          {userInfo.role === 'Admin' && (
          <Link to="/Home/school" className="text-gray-500">
            <div className='p-3 text-black  rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
              <PiStudentLight className="text-xl " /> Students
            </div>
          </Link>

          )}
          
          {userInfo.role === 'Admin' && (
          <Link to="/Home/school/staff" className="text-gray-500">
            <div className='p-3 text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
              <FaPersonMilitaryToPerson  className="text-xl" /> Staffs
            </div>
          </Link>
          )}

        </Link>
        <Link to="/Home/admin/setting" className="text-gray-500">
              <div className='p-3  text-black rounded-md hover:bg-gray-100 hover:text-black flex gap-2 items-center'>
                  <GrUserSettings className="text-xl text-black" />Settings
              </div>
        </Link>

      </div>
    </div>
  );
};
export default Sidebar;
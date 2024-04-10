import { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from 'react-redux';

function Mycodes() {
  const userInfo = useSelector((state) => state.auth.user);
  const requester = userInfo._id;

  const [allStaffs, setAllStaffs] = useState([]);
  const [myCodes, setMyCodes] = useState([]);

  // staff
  const staff = 'Staff';
  useEffect(() => {
    const fetchIssuesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/staffs/' + staff);
        setAllStaffs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssuesData();
  }, []);

  useEffect(() => {
    const fetchCodeRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/code/single-code-request/${requester}`);
        setMyCodes(response.data.filter((code) => code.in_use === false));
      } catch (error) {
        console.error('Error fetching code requests:', error);
      }
    };

    fetchCodeRequests();
  }, [userInfo._id]);



return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Ongoing Private Channels Codes</h1>
    {myCodes.length === 0 ? (
      <p>No ongoing private channel codes found.</p>
    ) : (
      myCodes.map((code) => (
        <div key={code._id} className="border border-gray-300 p-4 mb-4">
          <p className="font-semibold">Code: {code._id}</p>
          <p>Staff: {code.staffInfo.name}</p>
          <p>Appointment: {code.staffInfo.position}</p>
          <p>Created At: {code.createdAt}</p>
        </div>
      ))
    )}
  </div>
);
}

export default Mycodes;

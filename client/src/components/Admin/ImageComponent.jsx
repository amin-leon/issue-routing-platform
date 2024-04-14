import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ImageComponent() {

  // logged in user
  const userInfo = useSelector((state) => state.auth.user);
  const userId = userInfo._id;

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        console.log('Please select an image.');
        return;
      }

      const formData = new FormData();
      formData.append('profileImage', image);

      const response = await axios.put(`http://localhost:8080/auth/update-profile-image/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Profile image submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting profile image:', error);
    }
  };

  return (
    <div className="md:w-[90%] mt-1 md:p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 pb-7">Edit Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImageChange}
            className="border-none bg-gray-100 p-3 w-full rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit
        </button>
      </form>
    </div>
  );
}

export default ImageComponent;

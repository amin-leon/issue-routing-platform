import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import axios from 'axios';
import Modal from './pop_up/Model';
import { useSelector } from 'react-redux';




const validationSchema = object().shape({
  title: string()
    .max(30, 'Issue title must be at most 30 characters')
    .required('Title is required'),
    reporter: string()
    .required('Your id is missing please'),
  description: string()
    .max(200, 'Description must be at most 200 characters')
    .required('Description is required'),
  category: string().required('Select your category'),
});

function UpdateIssue() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const userInfo = useSelector((state)=> state.auth.user);
  const reporter = userInfo._id;



  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const onSubmitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('reporter', data.reporter);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('attachment', data.attachment[0]); // Assuming a single file is selected

      await axios.post('http://localhost:8080/issue/new-issue', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      openModal();
    } catch (error) {
      console.error('Error creating issue:', error);
    }
    reset();
  };

  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative pt-10">
        <div className="flex z-10 px-2">
          <div className="p-2 mx-auto rounded-2xl w-[90%] border">
           <p className='pb-8 text-2xl font-bold'>Update Issue </p>
            <form  onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className=''>
                    <input
                      {...register("title")}
                      type="text"
                      className="w-full  text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="Type a Title"
                      name="title"
                    />
                    <label className="text-sm font-medium text-red-500">{errors.title?.message}</label>
                  </div>
                  <div className='mt-2'>
                    <select
                      {...register("category")}
                      className="w-full text-base p-3 border-none bg-gray-100  rounded-lg focus:outline-none focus:border-blue-400"
                      name="category"
                    >
                      <option value="">Select category</option>
                      <option value="Welfare">Welfare</option>
                      <option value="Academic">Academic</option>
                      <option value="Rogistics">Rogistics</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>
                  <div className='mt-2'>
                    <input
                      type="file"
                      required
                      {...register("attachment")}
                      className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className='mt-2'>
                    <input
                    {...register('reporter')}
                      type="hidden"
                      className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="We want to see you"
                      name="reporter"
                      value={reporter}
                    />
                    <label className="text-sm font-medium text-red-500">{errors.reporter?.message}</label>
                  </div>
                </div>
                {/* text area and button */}
                <div>
                  <div>
                    <textarea {...register("description")} rows={10}
                      className="w-full text-base p-3 border-none bg-gray-100 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="Enter issue description"
                      name="description"
                    ></textarea>
                    <p className="text-sm font-medium text-red-500">{errors.description?.message}</p>
                  </div>
                  <button
                  type="submit"
                  className="bg-blue-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Update
                  </button>
                </div>
              </div>
              <p>
                <Link to='#' className='text-blue-500 max-w-64'>Back</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default UpdateIssue;

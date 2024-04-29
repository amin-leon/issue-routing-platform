import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from '../components/social-media-icons/SocialIcons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { authActions } from '../redux/auth/authSlice';




// Validaton uing yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {object, string}  from "yup";

// Validation Form schema
const validationSchema = object().shape({
  username: string()
  .required('username is required'),
 
fullName: string()
  .matches(/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces')
  .required('Full name is required'),
  
email: string()
  .email('Invalid email format')
  .required('Please enter email'),

password: string()
  .min(8, 'Password must be at least 8 characters')
  .required('Please enter password')   
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ),

});

const backgroundImageUrl = 'https://www.npc.ac.rw/fileadmin/user_upload/1H9A5050.jpg';

const containerStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative',
};

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
  });
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmitHandler = async(formData) => {
    try {
      dispatch(authActions.registerUserStart());
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      dispatch(authActions.registerUserSuccess(response.data));
      setRegistrationSuccess(true); // Set registration success
      
    } 
    catch (error) {
      console.error('Error saving data to MongoDB', error);
      if (error.response.data.error ==="Email has already taken.") {
        setError('Email is already taken. Please use a different email.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
      dispatch(authActions.registerUserFailure(error.message));

    }
    reset();
  };


    // Verify verification code
    const [verificationCode, setVerificationCode] = useState('');
    const handleVerifyCode = async () => {
      try {
        await axios.put(`http://localhost:8080/auth/verifycode/${verificationCode}/${formData.email}`);
        navigate('/');

      } catch (error) {
        setError(error.response.data.Message)
      }
    };


  return (
    <div>
      <div className="bg-no-repeat bg-cover bg-center relative" style={containerStyle}>
        <div className="absolute bg-gradient-to-b from-[#1F3365] to-black opacity-75 inset-0 z-0"></div>
        <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
            <div className="self-start hidden lg:flex flex-col  text-white">
              <img src="" className="mb-3" alt=''/>
              <h1 class="mb-8 font-bold text-3xl">RWANDA NATIONAL POLICE COLLAGE </h1>
              <p className="pr-3 text-sm">Lorem ipsum is placeholder text commonly used in the graphic, print,
                and publishing industries for previewing layouts and visual mockups</p>
              <p className='mt-5'>Join npc on #social medias:</p>
                 <SocialIcons />
            </div>
          </div>
          <div className="flex justify-center self-center z-10">
            <div className="p-12 bg-white mx-auto rounded-2xl w-[100%] ">
              <div>
                <p className='text-2xl pt-5'>Sign Up here</p>
                <p className='pb-5'>Create your new account so that you explore #App</p>
              </div>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-thin text-red-500">{errors.email?.message}</label>
                  <input
                   {...register("email")}
                    type="email"
                    className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="mail.example@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                <label className="text-sm font-thin text-red-500">{errors.password?.message}</label>
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                <label className="text-sm font-thin text-red-500">{errors.username?.message}</label>
                  <input
                  {...register("username")}
                    type="text"
                    className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Kmoreen12"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                <label className="text-sm font-thin text-red-500">{errors.fullName?.message}</label>
                  <input
                  {...register("fullName")}
                    type="text"
                    className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="Keza Morgon"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                {/* Gender */}
                <div>
                <label className="text-sm font-thin text-red-500">Gender error</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      className="mr-1"
                    />
                    Female
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      className="mr-1"
                    />
                    Male
                  </label>
                </div>
              </div>

                {/* Telephone */}
                <div>
                <label className="text-sm font-thin text-red-500">Telephone: Error here</label>
                  <input
                    type="number"
                    className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                    placeholder="0780933456"
                    name="telephone"
                  />
                </div>
              </div>
              {error && <div style={{ color: 'red' }}>{ error }</div>}
              <button
                type="submit"
                className="bg-[#1F3365] hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Create account
              </button>
              <p>Have account? <Link to='/' className='text-blue-500'>Login</Link></p>
            </form>

            {registrationSuccess && (
              <div>
                <label className="text-sm font-thin text-red-500">Check your email, Verification Code</label>
                <input
                  type="text"
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                  placeholder="Enter verification code"
                  name="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button className='bg-red-500 p-1 text-white mt-5 rounded-sm' onClick={handleVerifyCode}>Verify</button>
              </div>
            )}
              
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2023-2027
                  <a href="https://github.com/nplcodes/final2024" rel=""  title="NPL Codes" className="text-green hover:text-green-500 ">Npl Codes</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;

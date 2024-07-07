import React from 'react';
import banner from '../Home.png';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate()
    const addTaskHandler = ()=>{
        // console.log(token);
        if(token){
          navigate('/user')
        }else{
            alert("Please Login First");
            window.location='/login';
        }
    }
  return (
    <div className='mt-36 flex justify-center items-center'>
      <div className='max-w-screen-lg mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          <div className='text-center md:text-left'>
            <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welcome to 360⁰ Task Manager</h1>
            <p className='text-lg text-gray-600 mb-4'>Stay organized, efficient, and focused with our advanced task manager app.</p>
            <ul className='text-lg text-gray-600 mb-4'>
              <li>Manage tasks effortlessly</li>
              <li>Stay on top of deadlines</li>
              <li>Collaborate with your team</li>
            </ul>
            <button onClick={addTaskHandler} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md'>Get Started</button>
          </div>
          <img src={banner} className='w-full' alt="banner" />
        </div>
      </div>
    </div>
  );
}

export default Home;

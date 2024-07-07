import React from 'react';
import { useState, useEffect } from 'react';
import dummyUser from '../dummyUser.jpg';
import logo from '../logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserDashboard } from './api';

function Navbar() {
    const token = sessionStorage.getItem('token');
    // console.log(token);
    const navigate = useNavigate()
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
       
            getUserDashboard().then((data) => {

                // console.log('dashboard data', data)
                if (data !== null && Object.keys(data).length > 0) {
                    setUserData(data)
                    // console.log(userData);
                } else {
                    window.location.href = '/login'
                }
                setLoading(false)
            })
       
    }, []);


    const addTaskHandler = () => {
        console.log(token);
        if (token) {
            navigate('/user')
        } else {
            window.location = '/login';
        }
    };

    // Define navbar for logged out state
    const LoggedInNavbar = () => (
        <div className='w-screen flex justify-center items-center h-20 bg-white border-b-2 border-gray-200'>
            <div className=' w-2/3   flex justify-between items-center px-4'>
                <div onClick={() => window.location = '/'}>
                    <img src={logo} className='w-32' alt="logo" />
                </div>
                <nav className='flex space-x-4'>
                    <Link to="/" className='text-gray-700 hover:text-gray-900 font-semibold'>Home</Link>
                    <Link to="/tasks" className='text-gray-700 hover:text-gray-900 font-semibold'>Tasks</Link>
                    <Link to="/calendar" className='text-gray-700 hover:text-gray-900 font-semibold'>Calendar</Link>
                </nav>
                <div>

                    <button onClick={addTaskHandler} className='bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded'>Add Task</button>
                </div>
            </div>
        </div>
    );

    // Define navbar for logged in state
    const LoggedOutNavbar = () => (
        <div className="top-nav bg-white text-gray-800 absolute left-96 rounded-xl top-8 w-2/3 mx-auto p-4 flex justify-between items-center">
            <div className="user-info flex items-center">
                <img src={dummyUser} alt="User" className="user-photo h-11 w-11 rounded-full mr-2" />
                <div className="user-details">
                    <p className="user-name text-lg font-bold">{userData.name || 'User Name'}</p>
                    <p className="designation text-md">Designation</p>
                </div>
            </div>
            <ul className="nav-links flex">
                <li className="mr-4 px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer font-bold ">Overview</li>
                <li className="mr-4 px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer font-bold ">Updates</li>
                <li className="mr-4 px-2 py-1 hover:bg-gray-200 rounded-md font-bold cursor-pointer ">Feedback</li>
                <li className="cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-md font-bold ">Grow</li>
            </ul>
        </div>
    );

    // Render the appropriate navbar based on the token
    return token ? <LoggedOutNavbar /> : <LoggedInNavbar />;
}

export default Navbar;

import React, { useState, useEffect } from 'react';
import { SiMicrosoftteams } from "react-icons/si";
import { VscFeedback } from "react-icons/vsc";
import { GrUpdate, GrGrow } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { LuFileBarChart } from "react-icons/lu";
import dummyUser from '../dummyUser.jpg';
import logo from '../logo.png';
import { updateUserProfile } from './api'; // Assuming you have API functions
import { useUser } from '../providers/userProvider';

function User() {
    const { userData, setUserData, getUserDashboard } = useUser();
    const [loading, setLoading] = useState(true);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [managerOptList, setManagerOptList] = useState(false);
    const [engineerOptList, setEngineerOptList] = useState(false);
    const [adminOptList, setAdminOptList] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            await getUserDashboard();
            setLoading(false);
        };

        fetchUserData();
    }, [getUserDashboard]);

    useEffect(() => {
        if (userData && Object.keys(userData).length > 0) {
            setUpdatedProfile(userData);
            if (userData.designation === "Admin") {
                setAdminOptList(true);
            } else if (userData.designation === "Manager") {
                setManagerOptList(true);
            } else {
                setEngineerOptList(true);
            }
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const updateProfile = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await updateUserProfile(updatedProfile, token);
            setUserData(response);
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    };

    const renderUserInfo = () => (
        <div className='rounded-md flex gap-5 p-5 bg-black w-full h-60'>
            <div className='mt-5 h-52 w-1/4'>
                <img className='rounded-md' src={userData.photo || dummyUser} alt="User" />
            </div>
            <div className='flex justify-between flex-col text-white p-3 mt-5 rounded-md w-full'>
                <div>
                    <p className='font-bold text-3xl'>{userData.name || 'User Name'}</p>
                    <p className='text-gray-300'>{userData.designation || 'Designation'}</p>
                </div>
                <div>
                    <p>Email address: {userData.email || 'N/A'}</p>
                    <p>Phone number: {userData.mobileNumber || 'N/A'}</p>
                    <p>Joined on: {userData.joinedOn || 'N/A'}</p>
                </div>
            </div>
            <div className='text-white p-3 mt-5 rounded-md w-1/3'>
                <p>Department: {userData.department || 'N/A'}</p>
                <p>Manager: {userData.manager || 'N/A'}</p>
                <p>Date of birth: {userData.dob || 'N/A'}</p>
            </div>
        </div>
    );

    const renderUpdateForm = () => (
        <div className='fixed top-0 bottom-0 left-0 z-[999] right-0 h-screen bg-gray-700 flex justify-center items-center'>
            <div className="bg-gray-400 w-1/2 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={updatedProfile.name || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">DOB</label>
                    <input
                        type="text"
                        id="dob"
                        name="dob"
                        value={updatedProfile.dob || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your date of birth"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={updatedProfile.mobileNumber || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your phone"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name</label>
                    <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={updatedProfile.fatherName || ''}
                        onChange={handleInputChange}
                        placeholder="Enter your father's name"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={updateProfile}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => setShowUpdateForm(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className='relative'>
            <div className='bg-gradient-to-r absolute right-0 w-5/6 h-20 from-violet-800 to-pink-400'></div>
            <div className="user-container pt-20 bg-gray-200 flex flex-col">
                <div className="left-sidebar fixed left-0 w-1/6 flex flex-col justify-between h-screen top-0 bg-indigo-950 text-white p-4">
                    <div>
                        <div className='bg-white p-2 rounded-xl mb-5'>
                            <img src={logo} className='w-32' alt="logo" />
                        </div>
                        {engineerOptList && (
                            <ul className="engineer">
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><SiMicrosoftteams className='inline' /> Profile</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><VscFeedback className='inline' /> Projects</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GrUpdate className='inline' /> Deadlines</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GrGrow className='inline' /> Project hours</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GoGoal className='inline' /> Feedback</li>
                                <li className="cursor-pointer rounded-md hover:bg-violet-900 font-semibold py-1 px-2"> <LuFileBarChart className='inline' /> Skills</li>
                                <li className="cursor-pointer rounded-md hover:bg-violet-900 font-semibold py-1 px-2"> <LuFileBarChart className='inline' /> Reporting</li>
                            </ul>
                        )}
                        {adminOptList && (
                            <ul className="admin">
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><SiMicrosoftteams className='inline' /> My Team</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><VscFeedback className='inline' /> Feedback</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GrUpdate className='inline' /> Updates</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GrGrow className='inline' /> Grow</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GoGoal className='inline' /> Goals</li>
                                <li className="cursor-pointer rounded-md hover:bg-violet-900 font-semibold py-1 px-2"> <LuFileBarChart className='inline' /> Reporting</li>
                            </ul>
                        )}
                        {managerOptList && (
                            <ul className="manager">
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><SiMicrosoftteams className='inline' /> My Team</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><VscFeedback className='inline' /> Feedback</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GrUpdate className='inline' /> Updates</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GrGrow className='inline' /> Grow</li>
                                <li className="mb-2 rounded-md hover:bg-violet-900 font-semibold py-1 px-2 cursor-pointer"><GoGoal className='inline' /> Goals</li>
                                <li className="cursor-pointer rounded-md hover:bg-violet-900 font-semibold py-1 px-2"> <LuFileBarChart className='inline' /> Reporting</li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <div className="bottom-user-info border rounded-full text-white p-2 flex items-center">
                            <img src={dummyUser} alt="User" className="user-photo ml-1 h-8 w-8 rounded-full" />
                            <button onClick={() => setShowUpdateForm(true)} className="profile-button px-4 py-2 font-bold">{userData && userData.name || "User name"}</button>
                        </div>
                        <button onClick={handleLogout} className='border w-full text-white font-semibold px-4 py-2 mt-3 rounded hover:bg-gradient-to-r from-violet-800 to-pink-400'>Logout</button>
                    </div>
                </div>
                <div className="main-section absolute right-0 h-screen w-5/6 flex-1 p-4">
                    {loading ? <p>Loading...</p> : userData && renderUserInfo()}
                    <div className='flex flex-wrap justify-between'>
                        <div className='border p-6 mt-4 w-1/2 flex-col border-gray-400 rounded flex justify-center items-center'>
                            <h2 className="text-xl font-semibold mb-4">Overview</h2>
                            <p>Details for Overview section...</p>
                        </div>
                        <div className='border p-6 mt-4 w-1/2 flex-col border-gray-400 rounded flex justify-center items-center'>
                            <h2 className="text-xl font-semibold mt-6 mb-4">Updates</h2>
                            <p>Details for Updates section...</p>
                        </div>
                        <div className='border p-6 mt-4 w-1/2 flex-col border-gray-400 rounded flex justify-center items-center'>
                            <h2 className="text-xl font-semibold mt-6 mb-4">Feedback</h2>
                            <p>Details for Feedback section...</p>
                        </div>
                        <div className='border p-6 mt-4 w-1/2 flex-col border-gray-400 rounded flex justify-center items-center'>
                            <h2 className="text-xl font-semibold mt-6 mb-4">Grow</h2>
                            <p>Details for Grow section...</p>
                        </div>
                    </div>
                </div>
            </div>
            {showUpdateForm && renderUpdateForm()}
        </div>
    );
}

export default User;

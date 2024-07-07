import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [getData, setData] = useState({
        name: '',
        email: '',
        password: '',
        userType: ''
    });

    const [getError, setError] = useState(null);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!getData.name) {
            setError('UserName is mandatory');
            return;
        } else if (!getData.email) {
            setError('Email is mandatory');
            return;
        } else if (!getData.password) {
            setError('Password cannot be empty');
            return;
        }
        console.log(getData);
        axios.post('http://localhost:8143/registerUser', getData) // Add 'http://' before 'localhost'
            .then((result) => {
                console.log(result);
                navigate('/login');
            }).catch((error) => { // Catch the error and handle it
                console.log(error);
                setError(error.response.data.message); // Assuming the error response contains a message field
            });

    };

    return (
        <div className=" pt-28 bg-black bg-gradient-to-br from-blue-700 to-pink-600 h-screen text-white flex justify-center items-center">
            <div style={{ boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.4), -1px -2px 2px 2px rgba(255, 255, 255, 0.4)" }} className="w-1/3 rounded-3xl bg-transparent p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl mb-2 text-center font-bold text-white">Register</h2>

                    {getError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {getError}</span>
                    </div>}
                    <form onSubmit={onSubmitHandler} className="bg-transparent  rounded-3xl px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-white text-sm mb-2">UserName</label>
                            <input type="text" value={getData.name} onChange={onChangeHandler} name="name" autoComplete="off" className="shadow appearance-none bg-inherit border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your username" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white text-sm mb-2">Enter your Email ID</label>
                            <input type="email" value={getData.email} onChange={onChangeHandler} name="email" className="bg-inherit shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email address" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-white text-sm mb-2">Enter your Password</label>
                            <input type="password" value={getData.password} onChange={onChangeHandler} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight bg-inherit focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="userType" className="block text-white text-sm mb-2">App Type</label>
                            <select value={getData.userType} onChange={onChangeHandler} name="userType" className="shadow bg-inherit appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                                <option className='cursor-pointer bg-inherit'>Select user type</option>
                                <option value="Admin" className='cursor-pointer bg-inherit'>Admin</option>
                                <option value="Manager" className='cursor-pointer bg-inherit'>Manager</option>
                                <option value="Software Engineer" className='cursor-pointer bg-inherit'>Software Engineer</option>

                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../providers/userProvider';

function Login() {

  const { onTokenHandler } = useUser();

  const [getData, setData] = useState({
    email: '',
    password: ''
  });

  const [getError, setError] = useState(null);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value })
  }

  const registerHandler = () => {
    navigate('/register')
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();

    setError(null);
    if (!getData.email) {
      setError('Email is mandatory');
      return;
    }
    else if (!getData.password) {
      setError('Password cannot be empty');
      return;
    }
    console.log(getData);
    axios.post('http://localhost:8143/login', getData)
    .then((result) => {
      onTokenHandler(result.data.token);
      navigate('/user');
      console.log(result);
      console.log("Login Successful");
    }).catch((error) => {
      setError(error);
    })
  }

  return (
    <div className='flex justify-center items-center bg-gradient-to-br from-blue-700 to-pink-600 h-screen'>
      <div style={{ boxShadow: "1px 2px 2px 2px rgba(0, 0, 0, 0.4), -1px -2px 2px 2px rgba(255, 255, 255, 0.4)" }} className="w-1/4 rounded-3xl bg-transparent p-8">

        <h2 className="text-3xl font-semibold mb-4 text-center text-white">Login</h2>
        {getError && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">{getError}</div>}
        <form onSubmit={onSubmitHandler} className=" space-y-4">
          <div className="form-group">

            <input type="email" className=" cursor-pointer form-input bg-gray-50 text-black opacity-50 border p-1 mt-1 block w-full rounded-md border-gray-300" value={getData.email} onChange={onChangeHandler} name="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">

            <input type="password" className="cursor-pointer form-input opacity-50  bg-gray-50 border p-1 mt-1 block w-full rounded border-gray-300" value={getData.password} onChange={onChangeHandler} name="password" placeholder="Enter your password" />
          </div>
          
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">Login</button>
          <p onClick={registerHandler} className='text-blue-100 cursor-pointer underline'>Register me?</p>
        </form>
      </div>
    </div>
  )
}

export default Login;

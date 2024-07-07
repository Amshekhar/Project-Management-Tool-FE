// import { useUser } from '../providers/userProvider'; 
import Home from './Home';
import Navbar from './Navbar';
import Calendar from '../pages/Calendar';
import User from './User';
import Register from '../pages/Register';
import Login from '../pages/Login';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route
          path="/user"
          element={<User />}
        />
      </Routes>
      <Navbar/>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/calendar"
          element={<Calendar />}
        />
        
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
      
    </Router>
  );
}

export default App;

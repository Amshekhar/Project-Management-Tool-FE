import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App'
import { UserProvider } from './providers/userProvider';
// import { AdminProvider } from './providers/adminProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
      <App></App>
  </UserProvider>

);




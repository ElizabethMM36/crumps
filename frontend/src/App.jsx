import { useState ,useEffect } from 'react'
import {auth} from './components/firebase';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/register';
import { ToastContainer } from 'react-toastify';
import Profile from './components/profile.jsx';
function App() {
 const [user, setUser]= useState();
 useEffect(() =>{
  auth.onAuthStateChanged((user) =>{
    setUser(user);
  })

 })

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/profile" /> :<Login />} 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
        <ToastContainer /> {/*This enables toasts */}
      </div>
    </Router>
  );
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Register from './components/register';
import { ToastContainer } from 'react-toastify';

function App() {
 

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<profile />} />
            </Routes>
          </div>
        </div>
        <ToastContainer /> {/*This enables toasts */}
      </div>
    </Router>
  );
}

export default App

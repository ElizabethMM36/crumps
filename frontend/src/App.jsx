import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/CustomerDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useState } from 'react';
import Navbar from './components/Navbar';
import LoginPopup from './components/LoginPopup';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (

    <BrowserRouter>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
    <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/restaurant" element={<RestaurantDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes></div>
    </BrowserRouter>
  );
}

export default App;

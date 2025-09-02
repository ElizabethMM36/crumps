import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CustomerDashboard from './pages/CustomerDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useState } from 'react';
import AdminLoginPopup from './components/AdminLoginPopup';
import Navbar from './components/Navbar';
import LoginPopup from './components/LoginPopup';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css'; 
import AdminRoute from "./AdminRoute";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
         {showLogin === "user" && <LoginPopup setShowLogin={setShowLogin} />}
    {showLogin === "admin" && <AdminLoginPopup setShowLogin={setShowLogin} />}
    
      
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute allowedRoles={['customer']} />}><Route path="/customer" element={<CustomerDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['restaurant']} />}><Route path="/restaurant" element={<RestaurantDashboard />} />
          
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}><Route path="/admin" element={<AdminDashboard />} />
        
             <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

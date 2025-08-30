import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../assets/assets';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Navbar = ({ setShowLogin }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");

 
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // redirect home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboardRedirect = () => {
    if (!currentUser) return; // if no user, do nothing

    switch (currentUser.role) {
      case 'customer':
        navigate('/customer');
        break;
      case 'restaurant':
        navigate('/restaurant');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />

      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}><Link to="/">Home</Link></li>
        <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li>
        <li onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>Contact Us</li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" className="nav-icon" />

        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="basket" className="nav-icon" />
          <div className="dot"></div>
        </div>
        {currentUser ? (
          <>
            <button onClick={handleDashboardRedirect}>
              <img src={assets.profile_icon} alt="profile" className="icon" />
            </button>
            <button onClick={handleLogout}>Logout</button>

           
            
          </>
        ) : (
          <>
        <button onClick={() => setShowLogin("user")}>Sign In</button>
    <button onClick={() => setShowLogin("admin")}>Admin Login</button>
       </> )}
      </div>
    </div>
  );
};

export default Navbar;

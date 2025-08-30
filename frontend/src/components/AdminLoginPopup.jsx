import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import cross_icon from "../assets/cross_icon.png";
import "./AdminLoginPopup.css";

const AdminLoginPopup = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // ✅ Check inside "admins" collection
      const adminSnap = await getDoc(doc(db, "admins", user.uid));
      if (!adminSnap.exists()) {
        alert("Access denied. Not an admin user.");
        return;
      }

      // ✅ If admin exists, proceed
      navigate("/admin");
      setShowLogin(false);

    } catch (error) {
      alert("Admin login failed: " + error.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleAdminLogin}>
        <div className="login-popup-title">
          <h2>Admin Login</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={cross_icon}
            alt="close"
            className="close-icon"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPopup;

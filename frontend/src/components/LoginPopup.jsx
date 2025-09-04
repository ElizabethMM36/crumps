// src/components/LoginPopup.jsx
import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import './LoginPopup.css';
import cross_icon from '../assets/cross_icon.png'; // or import { assets } and use assets.cross_icon

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign In'); // "Sign In" or "Sign Up"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
 
  // If user is already logged in, redirect to their dashboard

  const handleSignup = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedPassword = password;

    if (!trimmedName) {
      alert('Name is required.');
      return;
    }
    if (!trimmedEmail) {
      alert('Email is required.');
      return;
    }
    if (!trimmedPassword) {
      alert('Password is required.');
      return;
    }
    if (trimmedPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    console.log('Signup payload:', { name: trimmedName, email: trimmedEmail, role });

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      const user = userCred.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: trimmedName,
        email: trimmedEmail,
        role,
        status: role === 'restaurant' ? 'pending' : 'approved',
        createdAt: new Date(),
      });

      alert('Signup successful!');
      if (role === 'customer') {
        setCurrState('Sign In');
        setPassword('');
        setName('');
      } else {
        alert('Restaurant account created. Please wait for admin approval.');
        setShowLogin(false);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed: ' + (error.message || error.code));
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password;

    if (!trimmedEmail || !trimmedPassword) {
      alert('Email and password are required.');
      return;
    }

    console.log('Signin payload:', { email: trimmedEmail });

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPassword
      );
      const user = userCred.user;
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      if (!userSnap.exists()) {
        alert('User profile not found in Firestore.');
        return;
      }
      const userData = userSnap.data();

      if (userData.role === 'restaurant' && userData.status === 'pending') {
        alert('Restaurant account pending approval. Please wait.');
        return;
      }

      // Redirect based on role
      if (userData.role === 'restaurant') navigate('/restaurant');
      else if (userData.role === 'customer') navigate('/customer');
      else if (userData.role === 'admin') navigate('/admin');

      setShowLogin(false);
    } catch (error) {
      console.error('Signin error:', error);
      alert('Login failed: ' + (error.message || error.code));
    }
  };

  return (
    <div className="login-popup">
      <form
        className="login-popup-container"
        onSubmit={currState === 'Sign In' ? handleSignin : handleSignup}
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={cross_icon}
            alt="Close"
            className="close-icon"
          />
        </div>

        {currState === 'Sign Up' && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </>
        )}

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

        <button type="submit">{currState}</button>

        <p className="login-toggle">
          {currState === 'Sign In'  ?  (
            <>
              Don&apos;t have an account?{' '}
              <span onClick={() => setCurrState('Sign Up')}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setCurrState('Sign In')}>Sign In</span>
            </>
          )}
          
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            console.log("User logged in successfully");
                toast.success("User logged in sucessfully",{
                    position:"top-center",
                })
        }catch(error){
            console.log(error.message);
            toast.error("Error logging in", {
                position: "top-center",
            });

        }

    }
    return(
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            <div className="mb-3">
                <label>Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <p className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
        </form>
    )
}




export default Login;